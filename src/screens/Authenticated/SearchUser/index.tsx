import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, String } from '../../../utils'
import database from '@react-native-firebase/database'
import { UserInfo } from '../../../redux-toolkit/userSlice'
import CustomLoader from '../../../components/view/CustomLoader'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated'
import { Routes } from '../../../routes/Routes'
import { useSelector } from 'react-redux'

interface SearchUserProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>
}

const SearchUser = ({ navigation }: SearchUserProps) => {
  const [input, setInput] = useState<string>('');
  const [userdata, setUserData] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const userId = useSelector((state: any) => state.userReducer.userInfo.uuid);

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    filterUsers();
  }, [input])

  const fetchUsers = () => {
    setLoader(true);
    try {
      database()
        .ref('users')
        .on('value', snapshot => {
          const users = snapshot.val();
          delete users[userId];
          const data = [];
          for (let id in users) {
            data.push(users[id]);
          }
          setUserData(data);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderDetailed = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.userContainer} onPress={
        () => navigation.navigate(Routes.Conversation, { id: item.uuid, userName: item.userName, profilePicture: item.profilePicture })
      }>
        <Image source={item.profilePicture ? { uri: item.profilePicture } : require('../../../assets/Images/user.jpg')} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.userBio}>{item.bio ? item.bio : null}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const filterUsers = () => {
    const filtered = userdata.filter((user) => {
      return user.userName?.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredUsers(filtered);
  }

  return (
    <View style={styles.container}>
      <CustomLoader loader={loader} setLoader={setLoader} />
      <View style={styles.inputField}>
        <Icon name="search-outline" size={25} color={Colors.DARK} />
        <TextInput
          style={styles.input}
          placeholder={String.searchUser}
          placeholderTextColor={Colors.TEXT_LITE_GRAY}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <Icon name="close-outline" size={25} color={Colors.DARK} onPress={() => setInput('')} />
      </View>

      <FlatList
        data={userdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDetailed}
      />
    </View>
  )
}

export default SearchUser