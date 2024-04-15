import {View, Image} from 'react-native';
import React from 'react';
import styles from './style';
import {Images} from '../../../utils';

type AppBackgroundProps = {
  children: React.ReactNode;
};

const AppBackground = ({children}: AppBackgroundProps) => {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.backgroundImage} source={Images.BackGround} />
      <Image
        style={styles.gradiantImage}
        source={Images.EllipseBackbackground}
      />
      {children}
    </View>
  );
};

export default AppBackground;
