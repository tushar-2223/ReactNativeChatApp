import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import styles from './style';
import AppBackground from '../../components/view/AppBackground';
import {String} from '../../utils';
import {useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigatorType} from '../../routes/Navigate';
import {Routes} from '../../routes/Routes';
import SplashScreen from 'react-native-splash-screen';

interface SplaceProps {
  navigation: NativeStackNavigationProp<RootNavigatorType, 'Splash'>;
}

const Splash = ({navigation}: SplaceProps) => {
  const user = useSelector((state: any) => state.userReducer.userInfo);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      if (user) {
        navigation.replace(Routes.Authentication);
      } else {
        navigation.replace(Routes.UnAuthenticated);
      }
    }, 3000);
  }, []);

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.appLogoContainer}>
          <Image
            source={require('../../assets/Images/messageBox.png')}
            style={styles.messageBox}
          />
          <Text style={styles.appName}>{String.appTitle}</Text>
        </View>
      </View>
    </AppBackground>
  );
};

export default Splash;
