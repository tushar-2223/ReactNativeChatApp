import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, String } from '../../../utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UnAuthenticatedNavigatorType } from '../../../routes/UnAuthenticated'
import { RootNavigatorType } from '../../../routes/Navigate'
import { Controller, set, useForm } from 'react-hook-form'
import CustomInput from '../../../components/ui/CustomInput'
import { REGEX } from '../../../utils/Constant'
import CustomButton from '../../../components/ui/CustomButton'
import { CommonActions } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addUser, UserInfo } from '../../../redux-toolkit/userSlice'
import Toast from 'react-native-toast-message'
import { Routes } from '../../../routes/Routes'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import CustomLoader from '../../../components/view/CustomLoader'

interface LoginProps {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
  [String.username]: string,
  [String.email]: string,
  [String.password]: string,
  [String.confirmPassword]: string
}

const Signup = ({ navigation }: LoginProps) => {

  const { control, handleSubmit, reset, setError, watch, formState: { errors } } = useForm<FormValues>()
  const watchPassword = watch(String.password)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState<boolean>(false)

  const onSubmit = async (data: FormValues) => {
    setLoader(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;
      const userInfo: UserInfo = {
        uuid: user?.uid,
        userName: data.userName,
        email: data.email,
        password: data.password,
        provider: String.emailPassword
      };
      database().ref(`users/${user?.uid}`).set(userInfo).then(() => {
        dispatch(addUser(userInfo));
        reset();
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: String.signupSuccess,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Routes.Authentication }],
          }),
        );
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError(String.email, { type: 'manual', message: String.emailExitLogin });
        setLoader(false);
      } else if (error.code === 'auth/weak-password') {
        setError(String.password, { type: 'manual', message: String.weakPassword });
        setLoader(false);
      } else {
        Toast.show({
          type: 'error',
          text1: String.signupFailed,
          text2: error.message
        });
        setLoader(false);
      }
    }
  }

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
          <Text style={styles.title}>{String.signupTitle}</Text>
          <Text style={styles.subText}>{String.loginSubText}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                lable={String.userNameLable}
                keyboardType='default'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors[String.username]?.message}
              />
            )}
            name={String.username}
            rules={{
              required: { value: true, message: String.userNameRequired }
            }}
          />

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

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                lable={String.confirmPasswordLable}
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors[String.confirmPassword]?.message}
              />
            )}
            name={String.confirmPassword}
            rules={{
              required: { value: true, message: String.confirmPasswordRequired },
              validate: value => value === watchPassword || String.confirmPasswordInvalid
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.button}>
        <CustomButton
          gradient={[Colors.BUTTON_GRADIENT_1, Colors.BUTTON_GRADIENT_2]}
          title={String.signup}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}

export default Signup