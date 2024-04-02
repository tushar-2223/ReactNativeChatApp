import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import Splash from '../screens/Splash';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';

export type RootNavigatorType = {
  [Routes.Splash]: undefined,
  [Routes.Authentication]: undefined,
  [Routes.UnAuthenticated]: undefined
};

const Stack = createNativeStackNavigator<RootNavigatorType>();

const Navigate = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Splash}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Splash} component={Splash}/>
      <Stack.Screen name={Routes.Authentication} component={Authenticated} />
      <Stack.Screen name={Routes.UnAuthenticated} component={UnAuthenticated} />
    </Stack.Navigator>
  )
}

export default Navigate