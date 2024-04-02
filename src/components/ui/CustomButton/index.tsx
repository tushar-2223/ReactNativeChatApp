import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import styles from './style'
import { Colors, Fonts } from '../../../utils'

interface Props {
  title: string,
  onPress?: () => void
  gradient?: string[],
  textColor?: string,
  fontFamily?: string,
  mb?: number,
  mt?: number,
}

const CustomButton = (props: Props) => {

  const {
    title,
    onPress,
    gradient = [Colors.LITE_BUTTON, Colors.LITE_BUTTON],
    textColor = Colors.PRIMARY,
    fontFamily = Fonts.bold,
    mb = 0,
    mt = 0,
  } = props

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.button,{ marginBottom: mb, marginTop: mt }]}
      >
        <Text style={[styles.text, { color: textColor, fontFamily: fontFamily }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default CustomButton