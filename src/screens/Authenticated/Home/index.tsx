import { View, Text, Image, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { Routes } from '../../../routes/Routes'
import { useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors, String, minAgo, storyData } from '../../../utils'
import AppBackground from '../../../components/view/AppBackground'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated'
import database from '@react-native-firebase/database'
import CustomLoader from '../../../components/view/CustomLoader'

interface HomeProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>
}

interface ChatUserData {
  content: string;
  ConversationKey: string;
  timestamp: string;
  receiverId: string;
  receiverName: string;
  receiverProfilePicture: string;
}

const Home = ({ navigation }: HomeProps) => {

  const user = useSelector((state: any) => state.userReducer.userInfo);
  const [chatData, setChatData] = useState<Record<string, ChatUserData[]>>({});
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    try {
      const userRef = database().ref(`users/${user.uuid}/conversation`);

      if (!userRef) {
        console.log(String.noChat)
      } else {
        userRef.on('value', (snapshot) => {
          const data = snapshot.val();
          const chatData: any = [];

          if (data) {
            for (let key in data) {
              const chat = data[key];
              chatData.push({
                content: chat.content,
                ConversationKey: chat.ConversationKey,
                timestamp: chat.timestamp,
                receiverId: chat.receiverId,
                receiverName: chat.userName,
                receiverProfilePicture: chat.profilePicture
              });
            }
            chatData.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setChatData(chatData);
          } else {
            console.log(String.dataNull);
          }
          setLoader(false);
        }
        )
      }
    } catch (error: any) {
      console.log('error', error);
      setLoader(false);
    }
  }, []);

  const renderStoryItems = ({ item }: any) => {
    return (
      <View style={styles.storyContainer}>
        <View style={[styles.storyImageContainer, { borderColor: item.borderColor }]}>
          <Image
            source={item.profileImage}
            style={styles.storyImage}
          />
        </View>
        <Text style={styles.storyText}>{item.name}</Text>
      </View>
    )
  }

  const renderChatItems = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.chatContainerBox} onPress={
        () => navigation.navigate(Routes.Conversation, { id: item.receiverId })
      }
      >
        <Image source={item.receiverProfilePicture ? { uri: item.receiverProfilePicture } : require('../../../assets/Images/user.jpg')
        } style={styles.chatUserImage} />
        <View style={styles.userDetailed}>
          <Text style={styles.userName}>{item.receiverName}</Text>
          <Text style={styles.lastChat}>{item.content}</Text>
        </View>
        <View style={styles.chatTimeContainer}>
          <Text style={styles.chatTime}>{minAgo(item.timestamp)}</Text>
          <View style={styles.chatNotification}>
            <Text style={styles.notificationText}>2</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const emptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{String.noChat}</Text>
      </View>
    )
  }

  return (
    <AppBackground>
      <CustomLoader
        loader={loader}
        setLoader={setLoader}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.searchIcon} onPress={() => navigation.navigate(Routes.SearchUser)}>
            <Icon name="search-outline" size={25} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{String.home}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Profile)}>
            <Image
              source={user?.profilePicture ? { uri: user.profilePicture } : require('../../../assets/Images/user.jpg')}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <FlatList
            data={storyData}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderStoryItems}
          />
        </View>

        <View style={styles.chatContainer}>
          <View style={styles.topBar} />

          <FlatList
            data={Object.values(chatData)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderChatItems}
            ListEmptyComponent={emptyContainer}
          />
        </View>
      </View>
    </AppBackground>
  )
}

export default Home