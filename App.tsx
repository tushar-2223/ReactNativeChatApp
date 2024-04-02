import 'react-native-gesture-handler';
import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigate from './src/routes/Navigate';
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux-toolkit/store';
import { PersistGate } from 'redux-persist/integration/react'
import Toast from 'react-native-toast-message';
import { Colors, GOOGLE_WEB_API_KEY } from './src/utils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_API_KEY,
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={Colors.TRANSPARENT}
          translucent
        />
        <NavigationContainer>
          <Navigate />
          <Toast
            position='bottom'
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App