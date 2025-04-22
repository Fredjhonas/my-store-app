import { Colors } from '@/constants/Colors';
import React from 'react';
import { TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';

type TextFieldProps = TextInputProps & {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onSubmit?: () => void;
  showError?: boolean;
  error?: string;
  accessibilityLabel?: string;
};

const TextField = ({ label, leftIcon, rightIcon, showError, error, ...props }: TextFieldProps) => {
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={{ alignItems: 'flex-start', width: '80%' }}>
        <ThemedText type="default" darkColor="gray" lightColor="gray">
          {label}
        </ThemedText>
      </View>
      <View style={$inputContainer}>
        {leftIcon}
        <TextInput 
          style={$input} 
          accessibilityLabel={props.accessibilityLabel || label}
          {...props} 
        />
        {rightIcon}
      </View>
      {/* Error message  */}
      {showError && (
        <ThemedText style={$error} type="default">
          {error}
        </ThemedText>
      )}
    </View>
  );
};

export default TextField;

const $inputContainer: ViewStyle = {
  height: 50,
  borderColor: 'gray',
  borderWidth: 0.5,
  marginTop: 10,
  width: '80%',
  paddingHorizontal: 10,
  borderRadius: 5,
  flexDirection: 'row',
  alignItems: 'center',
};

const $input: TextStyle = {
  height: 50,
  paddingHorizontal: 10,
  alignItems: 'center',
  flex: 1,
};

const $error: TextStyle = {
  color: Colors.light.error,
  marginTop: 5,
  width: '80%',
  textAlign: 'left',
};
