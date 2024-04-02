import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Colors, String } from '../../../utils';
import database from '@react-native-firebase/database';
import styles from './style';
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated';
import CustomLoader from '../../../components/view/CustomLoader';

type ConversationType = NativeStackScreenProps<AuthenticatedNavigatorType, 'Conversation'>;

interface ConversationMessage {
  content?: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  receiverName: string;
  receiverProfilePicture: string;
}

const Conversation = ({ navigation, route }: ConversationType) => {
  const { id, userName, profilePicture } = route.params;
  const user = useSelector((state: any) => state.userReducer.userInfo);
  const [input, setInput] = useState<string>('');
  const [conversations, setConversations] = useState<ConversationMessage[]>([]);
  const [day, setDay] = useState<string>(String.today);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    fetchConversations();
  }, []);

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
          const messages: ConversationMessage[] = [];

          for (let key in snapshotData) {
            const message = snapshotData[key];
            const day = getDay(message.timestamp);
            messages.push({ ...message, day });
          }
          setConversations(messages);
        });
      } else {
        setConversations([]);
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
        timestamp: new Date().toISOString(),
        receiverName: userName,
        receiverProfilePicture: profilePicture,
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
        database().ref(`users/${id}/conversation/${user.uuid}`).update(newMessage),
        database().ref(`users/${user.uuid}/conversation/${id}`).update(newMessage),
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
      setDay(String.today);
    } else if (yesterday === messageDate) {
      setDay(String.yesterday);
    } else {
      setDay(moment(timestamp).format('MMM DD, YYYY'));
    }
  }

  const renderChatBubble = ({ item }: { item: ConversationMessage }) => {
    const isSender = item.senderId === user.uuid;
    return (
      <View style={[styles.messageContainer, { alignSelf: isSender ? 'flex-end' : 'flex-start' }]}>
        {!isSender && <Image source={item.receiverProfilePicture ? { uri: item.receiverProfilePicture } : require('../../../assets/Images/user.jpg')} style={styles.userImage} />}
        <View>
          <Text style={styles.senderName}>{isSender ? String.you : item.receiverName}</Text>
          <View style={[styles.chatBubble, { borderTopStartRadius: isSender ? 15 : 0, borderTopEndRadius: isSender ? 0 : 15 }]}>
            <Text style={styles.message}>{item.content}</Text>
          </View>
          <Text style={styles.timestamp}>{moment(item.timestamp).format('hh:mm A')}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color={Colors.DARK} style={styles.searchIcon} onPress={() => navigation.goBack()} />
        <View style={styles.userContainer}>
          <Image source={profilePicture ? { uri: profilePicture } : require('../../../assets/Images/user.jpg')} style={styles.userImage} />
          <View>
            <Text style={styles.headerText}>{userName}</Text>
            <Text style={styles.userStatus}>{String.activeNow}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Icon name="call-outline" size={25} color={Colors.DARK} style={styles.searchIcon} />
          <Icon name="videocam-outline" size={25} color={Colors.DARK} style={styles.searchIcon} />
        </View>
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.chatHeader}>{day}</Text>
        <FlatList
          data={conversations}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderChatBubble}
          inverted
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="attach" size={26} color={Colors.TEXT_LITE_GRAY} style={styles.attachIcon} />
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
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
