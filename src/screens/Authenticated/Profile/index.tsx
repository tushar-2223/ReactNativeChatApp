import { View, Text, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated';
import { logOut } from '../../../redux-toolkit/userSlice';
import { CommonActions } from '@react-navigation/native';
import { Routes } from '../../../routes/Routes';
import Toast from 'react-native-toast-message';
import styles from './style';
import AppBackground from '../../../components/view/AppBackground';

interface ProfileProps {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>;
}

const Profile = ({ navigation }: ProfileProps) => {

  const user = useSelector((state: any) => state.userReducer.userInfo);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      if (user?.provider === 'Google') {
        await GoogleSignin.signOut();
      }
      await auth().signOut()
      dispatch(logOut())
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Routes.UnAuthenticated }],
        })
      )
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged out successfully',
      })
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      })
    }
  }

  return (
    <AppBackground>
      <Text>Profile</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.userName}</Text>
      <Text>{user?.provider}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </AppBackground>
  )
}

export default Profile