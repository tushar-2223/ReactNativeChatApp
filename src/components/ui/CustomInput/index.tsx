import {Text, TextInput, View} from 'react-native';
import React from 'react';
import styles from './style';
import {Colors} from '../../../utils';

interface InputProps {
  lable: string;
  keyboardType?: 'email-address' | 'default' | 'numeric' | 'phone-pad';
  onChangeText: () => void;
  onBlur: () => void;
  value: string;
  error: any;
  secureTextEntry?: boolean;
}

const CustomInput = (props: InputProps) => {
  const {
    lable,
    keyboardType = 'default',
    onChangeText,
    onBlur,
    value,
    error,
    secureTextEntry = false,
  } = props;

  return (
    <View style={styles.inputContainer}>
      <Text
        style={[
          styles.lable,
          {color: error ? Colors.ERROR_TEXT : Colors.TITLE_TEXT},
        ]}>
        {lable}
      </Text>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        value={value}
        style={[
          styles.input,
          {borderBottomColor: error ? Colors.ERROR_TEXT : Colors.INPUT_BORDER},
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;
