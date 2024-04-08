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

type ConversationType = NativeStackScreenProps<AuthenticatedNavigatorType, 'Conversation'>;

interface ConversationMessage {
  content?: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

const Conversation = ({ navigation, route }: ConversationType) => {
  const { id } = route.params;
  const user = useSelector((state: any) => state.userReducer.userInfo);
  const [input, setInput] = useState<string>('');
  const [conversations, setConversations] = useState<Record<string, ConversationMessage[]>>({});
  const [receiverData, setReceiverData] = useState<any>({});

  useEffect(() => {
    fetchConversations();
    fetchReceiverData(id)
  }, []);

  const fetchReceiverData = async (id: string) => {
    try {
      const snapshot = await database().ref(`users/${id}`).once('value');
      setReceiverData(snapshot.val());
    } catch (error) {
      console.log('Error fetching while receiver data:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      const receiverRef = database().ref(`users/${id}/conversation/${user.uuid}`);
      const senderRef = database().ref(`users/${user.uuid}/conversation/${id}`);
      const [receiverSnapshot, senderSnapshot] = await Promise.all([receiverRef.once('value'), senderRef.once('value')]);

      if (receiverSnapshot.exists() && senderSnapshot.exists()) {
        const conversationKey = receiverSnapshot.val().conversationKey;
        const conversationRef = database().ref(`conversations/${conversationKey}`).orderByChild('timestamp');

        conversationRef.on('value', (snapshot) => {
          const snapshotData = snapshot.val();
          const messages: Record<string, ConversationMessage[]> = {};

          for (let key in snapshotData) {
            const message = snapshotData[key];
            const day = getDay(message.timestamp);
            if (!messages[day]) {
              messages[day] = [];
            }
            messages[day].push({
              content: message.content,
              senderId: message.senderId,
              receiverId: message.receiverId,
              timestamp: message.timestamp,
            });
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

  const sendMessage = async () => {
    try {
      if (!input.trim()) {
        return;
      }

      const newMessage: ConversationMessage = {
        content: input,
        senderId: user.uuid,
        receiverId: id,
        timestamp: new Date().toISOString()
      };

      const receiverRef = database().ref(`users/${id}/conversation/${user.uuid}`);
      const senderRef = database().ref(`users/${user.uuid}/conversation/${id}`);
      const [receiverSnapshot, senderSnapshot] = await Promise.all([receiverRef.once('value'), senderRef.once('value')]);

      let conversationKey: any = '';

      if (!receiverSnapshot.exists() || !senderSnapshot.exists()) {
        conversationKey = database().ref('conversations').push().key;

        if (!receiverSnapshot.exists()) {
          database().ref(`users/${id}/conversation/${user.uuid}`).set({
            conversationKey: conversationKey,
            content: '',
            timestamp: new Date().toString(),
          });
        }
        if (!senderSnapshot.exists()) {
          database().ref(`users/${user.uuid}/conversation/${id}`).set({
            conversationKey: conversationKey,
            content: '',
            timestamp: new Date().toString(),
          });
        }
      } else {
        conversationKey = receiverSnapshot.val().conversationKey;
      }

      const conversationRef = database().ref(`conversations/${conversationKey}`);
      await Promise.all([
        database().ref(`users/${id}/conversation/${user.uuid}`).update({
          content: input,
          timestamp: new Date().toString(),
          conversationKey: conversationKey,
          receiverId: user.uuid,
          userName: user.userName,
          profilePicture: user.profilePicture
        }),
        database().ref(`users/${user.uuid}/conversation/${id}`).update({
          content: input,
          timestamp: new Date().toString(),
          conversationKey: conversationKey,
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
  }

  const renderChatBubble = ({ item }: { item: ConversationMessage }) => {
    const isSender = item.senderId === user.uuid;
    return (
      <View style={[styles.messageContainer, { alignSelf: isSender ? 'flex-end' : 'flex-start' }]}>
        {!isSender && <Image source={receiverData.profilePicture ? { uri: receiverData.profilePicture } : require('../../../assets/Images/user.jpg')} style={styles.userImage} />}
        <View>
          <Text style={styles.senderName}>{isSender ? String.you : receiverData.userName}</Text>
          <View style={[styles.chatBubble, { borderTopStartRadius: isSender ? 15 : 0, borderTopEndRadius: isSender ? 0 : 15 }]}>
            <Text style={styles.message}>{item.content}</Text>
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
        <View style={styles.userContainer}>
          <Image source={receiverData.profilePicture ? { uri: receiverData.profilePicture } : require('../../../assets/Images/user.jpg')} style={styles.userImage} />
          <View>
            <Text style={styles.headerText}>{receiverData.userName}</Text>
            <Text style={styles.userStatus}>{String.activeNow}</Text>
          </View>
        </View>
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
                inverted
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
