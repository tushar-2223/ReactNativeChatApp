import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import Signup from '../screens/UnAuthenticated/Signup';
import Login from '../screens/UnAuthenticated/Login';
import Welcome from '../screens/UnAuthenticated/Welcome';
import { Colors } from '../utils';

export type UnAuthenticatedNavigatorType = {
  [Routes.Welcome]: undefined,
  [Routes.Signup]: undefined,
  [Routes.Login]: undefined
};

const Stack = createNativeStackNavigator<UnAuthenticatedNavigatorType>();

const UnAuthenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Welcome}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor:Colors.PRIMARY
        }
      }}
    >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Signup} component={Signup} />
    </Stack.Navigator>
  )
}

export default UnAuthenticated