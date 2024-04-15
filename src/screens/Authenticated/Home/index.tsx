import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {Routes} from '../../../routes/Routes';
import {useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors, String, minAgo, storyData} from '../../../utils';
import AppBackground from '../../../components/view/AppBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthenticatedNavigatorType} from '../../../routes/Authenticated';
import database from '@react-native-firebase/database';
import CustomLoader from '../../../components/view/CustomLoader';
import CustomModal from '../../../components/view/CustomModal';
import {ModalType} from '../../../components/view/CustomModal';
import {useIsFocused} from '@react-navigation/native';

interface HomeProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>;
}

interface ChatUserData {
  content: string;
  conversationKey: string;
  timestamp: string;
  receiverId?: string;
  receiverName?: string;
  profilePicture?: string;
  //for group chat
  groupName?: string;
  type?: string;
}

const Home = ({navigation}: HomeProps) => {
  const user = useSelector((state: any) => state.userReducer.userInfo);
  const [chatData, setChatData] = useState<Record<string, ChatUserData[]>>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>(ModalType.ALERT);
  const isFocusedScreen = useIsFocused();

  //handle back button action
  useEffect(() => {
    const backAction = () => {
      openModal(String.alert, ModalType.BACKHANDLER, String.backActionMessage);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isFocusedScreen) {
          return backAction();
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [isFocusedScreen]);

  //fetch conversation data for displaying chat and last message
  useEffect(() => {
    setLoader(true);
    try {
      const userRef = database().ref(`users/${user.uuid}/conversation`);

      if (!userRef) {
        console.log(String.noChat);
      } else {
        userRef.on('value', snapshot => {
          const data = snapshot.val();
          const chatData: any = [];

          if (data) {
            for (let key in data) {
              const chat = data[key];
              chatData.push({
                ...chat,
                receiverName: chat.userName,
              });
            }
            chatData.sort(
              (a: any, b: any) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime(),
            );
            setChatData(chatData);
          } else {
            console.log(String.dataNull);
          }
          setLoader(false);
        });
      }
    } catch (error: any) {
      console.log('error', error);
      setLoader(false);
    }
  }, []);

  const renderStoryItems = ({item}: any) => {
    return (
      <View style={styles.storyContainer}>
        <View
          style={[styles.storyImageContainer, {borderColor: item.borderColor}]}>
          <Image
            source={
              item.profilePicture
                ? {uri: item.profilePicture}
                : require('../../../assets/Images/user.jpg')
            }
            style={styles.storyImage}
          />
        </View>
        <Text style={styles.storyText} numberOfLines={1} ellipsizeMode="tail">
          {item.userName}
        </Text>
      </View>
    );
  };

  const renderChatItems = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.chatContainerBox}
        onPress={() =>
          navigation.navigate(Routes.Conversation, {
            id: item.type === 'group' ? item.conversationKey : item.receiverId,
            type: item.type,
          })
        }>
        <Image
          source={
            item.profilePicture
              ? {uri: item.profilePicture}
              : require('../../../assets/Images/user.jpg')
          }
          style={styles.chatUserImage}
        />
        <View style={styles.userDetailed}>
          <Text style={styles.userName}>
            {item.receiverName ? item.receiverName : item.groupName}
          </Text>
          <Text style={styles.lastChat} numberOfLines={1}>
            {item.content}
          </Text>
        </View>
        <View style={styles.chatTimeContainer}>
          <Text style={styles.chatTime}>{minAgo(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{String.noChat}</Text>
      </View>
    );
  };

  const openModal = (title: string, type: ModalType, message: string) => {
    setModal(true);
    setTitle(title);
    setModalType(type);
    setMessage(message);
  };

  return (
    <AppBackground>
      <CustomLoader loader={loader} setLoader={setLoader} />
      <CustomModal
        modal={modal}
        setModal={setModal}
        type={modalType}
        title={title}
        message={message}
        button1Text={String.ok}
        button1Action={() => BackHandler.exitApp()}
        button2Text={String.cancel}
        button2Action={() => setModal(false)}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => navigation.navigate(Routes.SearchUser)}>
            <Icon name="search-outline" size={25} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{String.home}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Profile)}>
            <Image
              source={
                user?.profilePicture
                  ? {uri: user.profilePicture}
                  : require('../../../assets/Images/user.jpg')
              }
              style={styles.profilePicture}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <FlatList
            data={storyData}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderStoryItems}
          />
        </View>

        <View style={styles.chatContainer}>
          <View style={styles.topBar} />

          <FlatList
            data={Object.values(chatData)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderChatItems}
            ListEmptyComponent={emptyContainer}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default Home;
