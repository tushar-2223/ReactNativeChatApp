import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Authenticated/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import SearchUser from '../screens/Authenticated/SearchUser';
import Profile from '../screens/Authenticated/Profile';
import Conversation from '../screens/Authenticated/Conversation';

export type AuthenticatedNavigatorType = {
  [Routes.Home]: undefined,
  [Routes.SearchUser]: undefined,
  [Routes.Profile]: undefined,
  [Routes.Conversation]: { id: string, userName: string, profilePicture: string },
};

const Stack = createNativeStackNavigator<AuthenticatedNavigatorType>();

const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.SearchUser} component={SearchUser} />
      <Stack.Screen name={Routes.Profile} component={Profile}/>
      <Stack.Screen name={Routes.Conversation} component={Conversation} />
    </Stack.Navigator>
  )
}

export default Authenticated