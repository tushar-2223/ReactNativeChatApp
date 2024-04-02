import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { Images, String } from '../../../utils'
import { Routes } from '../../../routes/Routes'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { addUser, UserInfo } from '../../../redux-toolkit/userSlice'
import { useDispatch } from 'react-redux';
import { CommonActions, NavigationProp } from '@react-navigation/native'
import CustomLoader from '../../view/CustomLoader'

interface SocialButtonsProps {
    navigation: NavigationProp<any>,
    bgColor?: string,
    screen?: string
}

const SocialButtons = (props: SocialButtonsProps) => {

    const { navigation, bgColor, screen } = props;
    const [loader, setLoader] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onGoogleLogin = async () => {
        setLoader(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            const user = userCredential.user;

            const userObj: UserInfo = {
                email: user?.email,
                userName: user?.displayName,
                uuid: user?.uid,
                profilePicture: user?.photoURL,
                provider: String.google
            }
            database().ref(`users/${user.uid}`).set(userObj).then(() => {
                dispatch(addUser(userObj));
                setLoader(false);
                Toast.show({
                    type: 'success',
                    text1: String.logInSuccess,
                });
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: Routes.Authentication }],
                    }),
                );
                GoogleSignin.revokeAccess();
            });
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                setLoader(false);
                Toast.show({
                    type: 'error',
                    text1: String.invalidCredentials,
                });
            } else {
                setLoader(false);
                Toast.show({
                    type: 'error',
                    text1: String.logInFailed
                });
            }
        }
    }

    const onFacebookLogin = () => {
        Toast.show({
            type: 'success',
            text1: String.facebookLogin
        });
    }

    const onAppleLogin = () => {
        Toast.show({
            type: 'success',
            text1: String.appleLogin
        });
    }

    const socialButton = (icon: any, onPress?: any) => {
        return (
            <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: bgColor }]}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <Image source={icon} style={styles.socialIcon} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.socialAuthentication}>
            <CustomLoader loader={loader} setLoader={setLoader} />
            {socialButton(Images.facebookIcon, onFacebookLogin)}
            {socialButton(Images.googleIcon, onGoogleLogin)}
            {socialButton(screen === Routes.Welcome ? Images.appleIcon : Images.appleIconDark, onAppleLogin)}
        </View>
    )
}

export default SocialButtons