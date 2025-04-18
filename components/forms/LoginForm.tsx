import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  ActivityIndicator,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';

type LoginFormProps = {
  formData: {
    username: string;
    password: string;
  };
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

const formFields: Array<{
  label: string;
  placeholder: string;
  key: keyof LoginFormProps['formData'];
  secure: boolean;
}> = [
  {
    label: 'Usuario',
    placeholder: 'Ingrese su usuario',
    key: 'username',
    secure: false,
  },
  {
    label: 'Contraseña',
    placeholder: 'Ingrese su contraseña',
    key: 'password',
    secure: true,
  },
];

const LoginForm = ({ formData, onChange, onSubmit, loading }: LoginFormProps) => {
  return (
    <View style={$formContainer}>
      {formFields.map((field) => {
        return (
          <View key={field.key} style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ alignItems: 'flex-start', width: '80%' }}>
              <ThemedText type="default" darkColor="gray" lightColor="gray">
                {field.label}
              </ThemedText>
            </View>
            <TextInput
              key={field.key}
              style={$input}
              placeholder={field.placeholder}
              secureTextEntry={field.secure}
              onChangeText={(text) => onChange(field.key, text)}
              onSubmitEditing={onSubmit}
              autoCapitalize="none"
              value={formData[field.key]}
              placeholderTextColor={Colors.light.placeholder}
            />
          </View>
        );
      })}
      <TouchableOpacity style={$button} onPress={onSubmit}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ThemedText type="default" lightColor="white">
            Ingresar
          </ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const $formContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  gap: 20,
};

const $input: TextStyle = {
  height: 50,
  borderColor: 'gray',
  borderWidth: 1,
  marginTop: 10,
  width: '80%',
  paddingLeft: 10,
  borderRadius: 5,
};

const $button: ViewStyle = {
  backgroundColor: Colors.light.tint,
  height: 50,
  borderRadius: 5,
  width: '80%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
};
