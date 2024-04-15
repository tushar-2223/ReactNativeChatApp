import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import AppBackground from '../../../components/view/AppBackground';
import {Colors, Fonts, String} from '../../../utils';
import CustomButton from '../../../components/ui/CustomButton';
import {height} from '../../../utils/Constant';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UnAuthenticatedNavigatorType} from '../../../routes/UnAuthenticated';
import {Routes} from '../../../routes/Routes';
import SocialButtons from '../../../components/ui/SocialButtons';

interface WelcomeProps {
  navigation: NativeStackNavigationProp<
    UnAuthenticatedNavigatorType,
    'Welcome'
  >;
}

const Welcome = ({navigation}: WelcomeProps) => {
  return (
    <AppBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{String.welcomeTitle}</Text>
        <Text style={styles.subText}>{String.welcomeSubText}</Text>

        <SocialButtons
          bgColor={Colors.SOCIAL_BUTTON}
          screen={Routes.Welcome}
          navigation={navigation}
        />

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>{String.or}</Text>
          <View style={styles.line} />
        </View>

        <CustomButton
          title={String.signupTitle}
          fontFamily={Fonts.medium}
          onPress={() => navigation.navigate(Routes.Signup)}
          mt={height * 0.03}
        />

        <View style={styles.otherAuth}>
          <Text style={styles.otherAuthText}>{String.exitingAccount}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(Routes.Login)}>
            <Text style={styles.otherAuthButton}>{String.login}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default Welcome;
