import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticatedNavigatorType} from '../../../routes/Authenticated';
import database from '@react-native-firebase/database';
import {UserInfo} from '../../../redux-toolkit/userSlice';
import AppBackground from '../../../components/view/AppBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, String} from '../../../utils';
import { useSelector } from 'react-redux';

type GroupDetailesProps = NativeStackScreenProps<
  AuthenticatedNavigatorType,
  'GroupDetailes'
>;

const GroupDetailes = ({navigation, route}: GroupDetailesProps) => {
  const {id, groupImage, groupName} = route.params;
  const [groupUsers, setGroupUsers] = useState<UserInfo[]>([]);
  const user = useSelector((state: any) => state.userReducer.userInfo);

  useEffect(() => {
    fetchGroupUsers();
  }, []);

  const fetchGroupUsers = async () => {
    try {
      const usersIds = (
        await database().ref(`users/${user.uuid}/conversation/${id}/allUsers`).once('value')
      ).val();
      let users: UserInfo[] = [];

      for (let i = 0; i < usersIds.length; i++) {
        const user = (
          await database().ref(`users/${usersIds[i]}`).once('value')
        ).val();
        users.push(user);
      }

      setGroupUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const renderChatItems = ({item}: any) => {
    return (
      <View style={styles.chatContainerBox}>
        <Image
          source={
            item.profilePicture
              ? {uri: item.profilePicture}
              : require('../../../assets/Images/user.jpg')
          }
          style={styles.chatUserImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.userName}</Text>
        </View>
      </View>
    );
  };

  const emptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{String.noChat}</Text>
      </View>
    );
  };

  return (
    <AppBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>

        <View style={styles.groupDetailed}>
          <Image
            source={
              groupImage
                ? {uri: groupImage}
                : require('../../../assets/Images/user.jpg')
            }
            style={styles.profilePicture}
          />
          <Text style={styles.groupName}>{groupName}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.groupuserHeader}>{String.groupUsers}</Text>
        <FlatList
          data={groupUsers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderChatItems}
          ListEmptyComponent={emptyContainer}
        />
      </View>
    </AppBackground>
  );
};

export default GroupDetailes;
