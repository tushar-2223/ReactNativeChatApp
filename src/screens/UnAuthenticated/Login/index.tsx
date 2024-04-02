import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Images, String } from '../../../utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UnAuthenticatedNavigatorType } from '../../../routes/UnAuthenticated'
import { RootNavigatorType } from '../../../routes/Navigate'
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '../../../components/ui/CustomInput'
import { REGEX } from '../../../utils/Constant'
import CustomButton from '../../../components/ui/CustomButton'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { useDispatch } from 'react-redux'
import { addUser, UserInfo } from '../../../redux-toolkit/userSlice'
import Toast from 'react-native-toast-message'
import { CommonActions } from '@react-navigation/native'
import { Routes } from '../../../routes/Routes'
import SocialButtons from '../../../components/ui/SocialButtons'
import CustomLoader from '../../../components/view/CustomLoader'

interface LoginProps {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
  [String.email]: string,
  [String.password]: string,
}

const Login = ({ navigation }: LoginProps) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setLoader(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;

      const userRef = database().ref(`users/${user?.uid}`);
      userRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userInfo: UserInfo = {
            uuid: user?.uid,
            userName: snapshot.val().userName,
            email: snapshot.val().email,
            password: data?.password,
            provider: String.emailPassword,
          };
          dispatch(addUser(userInfo));
          reset();
          setLoader(false);
          Toast.show({
            type: 'success',
            text1: String.loginSuccess,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Routes.Authentication }],
            }),
          );
        } else {
          Toast.show({
            type: 'error',
            text1: String.userNotFound,
          });
        }
      });
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        Toast.show({
          type: 'error',
          text1: String.invalidCredentials,
        });
        setLoader(false);
      } else {
        Toast.show({
          type: 'error',
          text1: String.loginFailed,
        });
        setLoader(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomLoader loader={loader} setLoader={setLoader} />
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backAction}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="keyboard-backspace" size={25} color={Colors.DARK} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>{String.loginTitle}</Text>
          <Text style={styles.subText}>{String.loginSubText}</Text>
        </View>

        <SocialButtons navigation={navigation} />

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>{String.or}</Text>
          <View style={styles.line} />
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              lable={String.emailLable}
              keyboardType='email-address'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors[String.email]?.message}
            />
          )}
          name={String.email}
          rules={{
            required: { value: true, message: String.emailRequired },
            pattern: { value: REGEX.EMAIL, message: String.emailInvalid }
          }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              lable={String.passwordLable}
              keyboardType='default'
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors[String.password]?.message}
            />
          )}
          name={String.password}
          rules={{
            required: { value: true, message: String.passwordRequired },
            pattern: { value: REGEX.PASSWORD, message: String.passwordInvalid }
          }}
        />

      </ScrollView>

      <View style={styles.button}>
        <CustomButton
          gradient={[Colors.BUTTON_GRADIENT_1, Colors.BUTTON_GRADIENT_2]}
          title={String.login}
          onPress={handleSubmit(onSubmit)}
        />

        <Text style={styles.forgotPassword}>{String.forgotPassword}</Text>
      </View>
    </View>
  )
}

export default Login