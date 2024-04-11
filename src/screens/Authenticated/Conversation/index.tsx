import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Colors, String } from '../../../utils';
import database from '@react-native-firebase/database';
import styles from './style';
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated';
import { Routes } from '../../../routes/Routes';

type ConversationType = NativeStackScreenProps<AuthenticatedNavigatorType, 'Conversation'>;

interface ConversationMessage {
  content?: string;
  senderId: string;
  receiverId?: string;
  timestamp: string;
  //for group chat
  senderName?: string;
  profilePicture?: string;
}

const Conversation = ({ navigation, route }: ConversationType) => {
  const { id, type } = route.params;
  const user = useSelector((state: any) => state.userReducer.userInfo);
  const [input, setInput] = useState<string>('');
  const [conversations, setConversations] = useState<Record<string, ConversationMessage[]>>({});
  const [receiverData, setReceiverData] = useState<any>({}); // Users | Group Details
  const [fetchGroupSelectedUsers, setFetchGroupSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchConversations();
    fetchReceiverData();
    type === 'group' && fetchSelectedUsers();
  }, []);

  // fetch receiver data and group details for header
  const fetchReceiverData = async () => {
    try {
      const snapshot = await database().ref(`users/${id}`).once('value');
      const groupRef = database().ref(`users/${user.uuid}/conversation/${id}`);

      if (type === 'group') {
        const groupSnapshot = await groupRef.once('value');
        if (groupSnapshot.exists()) {
          setReceiverData(groupSnapshot.val());
        }
      } else {
        if (snapshot.exists()) {
          setReceiverData(snapshot.val());
        }
      }
    } catch (error) {
      console.log('Error fetching while receiver data:', error);
    }
  };

  //fetch group selected users
  const fetchSelectedUsers = async () => {
    try {
      const conversationRef = database().ref(`conversations/${id}/allUsers`);
      const snapshot = await conversationRef.once('value');

      if (snapshot.exists()) {
        const selectedUsers = snapshot.val();
        setFetchGroupSelectedUsers(selectedUsers);
      }
    } catch (error) {
      console.log('Error fetching group selected users:', error);
    }
  };

  //fetch conversations from database and set in state (Single and Group Chat)
  const fetchConversations = async () => {
    try {
      const receiverRef = database().ref(`users/${id}/conversation/${user.uuid}`);
      const senderRef = database().ref(`users/${user.uuid}/conversation/${id}`);
      const [receiverSnapshot, senderSnapshot] = await Promise.all([receiverRef.once('value'), senderRef.once('value')]);

      if (receiverSnapshot.exists() || senderSnapshot.exists()) {
        const conversationKey = senderSnapshot.val().conversationKey;
        const conversationRef = database().ref(`conversations/${conversationKey}`).orderByChild('timestamp');

        conversationRef.on('value', (snapshot) => {
          const snapshotData = snapshot.val();
          const messages: Record<string, ConversationMessage[]> = {};

          //fetch messages and sort by day
          for (let key in snapshotData) {
            const message = snapshotData[key];
            const day = getDay(message.timestamp);
            messages[day] = messages[day] || [];
            messages[day].push({
              content: message.content,
              senderId: message.senderId,
              receiverId: message.receiverId,
              timestamp: message.timestamp,
              senderName: message.senderName,
              profilePicture: message.profilePicture,
            });
            //sort messages by timestamp
            messages[day].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          }
          setConversations(messages);
        });
      } else {
        setConversations({});
      }
    } catch (error) {
      console.log('Error fetching conversations:', error);
    }
  };

  //🚀 send message to database (Single and Group Chat)
  const sendMessage = async () => {
    try {
      if (!input.trim()) {
        return;
      }

      const newMessage: ConversationMessage = {
        content: input,
        senderId: user.uuid,
        receiverId: id,
        timestamp: new Date().toISOString(),
      };

      const groupMessage: ConversationMessage = {
        content: input,
        senderId: user.uuid,
        timestamp: new Date().toISOString(),
        senderName: user.userName,
        profilePicture: user.profilePicture ? user.profilePicture : '',
      };

      //for group chat (update all users in group chat with new message)
      if (type === 'group') {
        const groupRef = database().ref(`users/${user.uuid}/conversation/${id}`);
        const groupSnapshot = await groupRef.once('value');

        if (groupSnapshot.exists()) {
          const conversationKey = groupSnapshot.val().conversationKey;
          const conversationRef = database().ref(`conversations/${conversationKey}`);

          await Promise.all(fetchGroupSelectedUsers.map(async (uuid) => {
            const userRef = database().ref(`users/${uuid}/conversation/${id}`);
            await userRef.update({
              content: input,
              timestamp: new Date().toISOString(),
            });
          }));

          await conversationRef.push().set(groupMessage);

          setInput('');
          fetchConversations();
          return;
        }
      }

      const receiverRef = database().ref(`users/${id}/conversation/${user.uuid}`);
      const senderRef = database().ref(`users/${user.uuid}/conversation/${id}`);
      const [receiverSnapshot, senderSnapshot] = await Promise.all([receiverRef.once('value'), senderRef.once('value')]);

      let conversationKey: any = '';

      //create new conversation if not exists
      if (!receiverSnapshot.exists() || !senderSnapshot.exists()) {
        conversationKey = database().ref('conversations').push().key;

        if (!receiverSnapshot.exists()) {
          await database().ref(`users/${id}/conversation/${user.uuid}`).set({
            conversationKey,
            content: '',
            timestamp: new Date().toString(),
          });
        }
        if (!senderSnapshot.exists()) {
          await database().ref(`users/${user.uuid}/conversation/${id}`).set({
            conversationKey,
            content: '',
            timestamp: new Date().toString(),
          });
        }
      } else {
        conversationKey = receiverSnapshot.val().conversationKey;
      }

      //send message receiver and sender
      const conversationRef = database().ref(`conversations/${conversationKey}`);
      await Promise.all([
        database().ref(`users/${id}/conversation/${user.uuid}`).update({
          content: input,
          timestamp: new Date().toString(),
          conversationKey,
          receiverId: user.uuid,
          userName: user.userName,
          profilePicture: user.profilePicture
        }),
        database().ref(`users/${user.uuid}/conversation/${id}`).update({
          content: input,
          timestamp: new Date().toString(),
          conversationKey,
          receiverId: id,
          userName: receiverData.userName,
          profilePicture: receiverData.profilePicture
        }),
        conversationRef.push().set(newMessage),
      ]);

      setInput('');
      fetchConversations();
    } catch (error: any) {
      console.log('Error sending message:', error);
    }
  };

  // for filtering messages by day
  const getDay = (timestamp: string) => {
    const today = moment().format('YYYY-MM-DD');
    const messageDate = moment(timestamp).format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

    if (today === messageDate) {
      return String.today;
    } else if (yesterday === messageDate) {
      return String.yesterday;
    } else {
      return moment(timestamp).format('MMM DD, YYYY');
    }
  };

  // render single chat bubble
  const renderChatBubble = ({ item }: { item: ConversationMessage }) => {
    const isSender = item.senderId === user.uuid;
    if (!item.content) return null;

    const senderName = isSender ? String.you : type === 'group' ? item.senderName : receiverData.userName;

    return (
      <View style={[styles.messageContainer, {
        alignSelf: isSender ? 'flex-end' : 'flex-start',
        flexDirection: isSender ? 'row-reverse' : 'row',
      }]}>
        {!isSender && (
          <Image
            source={item.profilePicture ? { uri: item.profilePicture } : require('../../../assets/Images/user.jpg')}
            style={styles.userImage}
          />
        )}
        <View>
          <Text style={[styles.senderName, { alignSelf: isSender ? 'flex-end' : 'flex-start' }]}>{senderName}</Text>
          <View style={[styles.chatBubble, {
            borderTopStartRadius: isSender ? 15 : 0,
            borderTopEndRadius: isSender ? 0 : 15,
            backgroundColor: isSender ? Colors.CHAT_BUBBLE : Colors.RECEIVER_CHAT_BUBBLE,
          }]}>
            <Text style={[styles.message, { color: isSender ? Colors.PRIMARY : Colors.DARK }]}>{item.content}</Text>
          </View>
          <Text style={styles.timestamp}>{moment(item.timestamp).format('hh:mm A')}</Text>
        </View>
      </View>
    );
  };

  const renderDayHeader = (day: string) => {
    return (
      <View style={styles.dayHeaderContainer}>
        <Text style={styles.dayHeaderText}>{day}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color={Colors.DARK} style={styles.searchIcon} onPress={() => navigation.goBack()} />
        <TouchableOpacity style={styles.userContainer} onPress={
          type === 'group' ? () => navigation.navigate(Routes.GroupDetailes,
            {
              id,
              groupImage: receiverData.profilePicture,
              groupName: receiverData.groupName,
            }) : () => { }
        }>
          <Image source={receiverData.profilePicture ? { uri: receiverData.profilePicture } : require('../../../assets/Images/user.jpg')} style={styles.userImage} />
          <View>
            <Text style={styles.headerText}>{receiverData.userName ?
              receiverData.userName : receiverData.groupName
            }
            </Text>
            <Text style={styles.userStatus}>{String.activeNow}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Icon name="call-outline" size={25} color={Colors.DARK} style={styles.searchIcon} />
          <Icon name="videocam-outline" size={25} color={Colors.DARK} style={styles.searchIcon} />
        </View>
      </View>

      <View style={styles.chatContainer}>
        <FlatList
          data={Object.keys(conversations)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              {item !== '' && renderDayHeader(item)}
              <FlatList
                data={conversations[item]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChatBubble}
              />
            </View>
          )}
          inverted
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <Icon name="attach" size={26} color={Colors.TEXT_LITE_GRAY} style={styles.attachIcon} />
          <TextInput
            style={styles.input}
            placeholder={String.typeMessage}
            value={input}
            placeholderTextColor={Colors.TEXT_LITE_GRAY}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
        >
          <Icon name="send" size={23} color={Colors.CHAT_BUBBLE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Conversation;