import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import TextField from '../input/TextField';
import { IconSymbol } from '../ui/IconSymbol';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({
    username: false,
    password: false,
  });

  const hasUsername = formData.username && formData.username.length > 0;
  const hasPassword = formData.password && formData.password.length > 0;

  const handleSubmit = () => {
    if (!hasUsername || !hasPassword) {
      setShowError({
        username: !hasUsername,
        password: !hasPassword,
      });
      return;
    }

    setShowError({
      username: false,
      password: false,
    });
    onSubmit();
  };

  return (
    <View style={$formContainer}>
      {formFields.map((field) => {
        return (
          <TextField
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            secureTextEntry={field.secure && !showPassword}
            onChangeText={(text) => onChange(field.key, text)}
            onSubmitEditing={handleSubmit}
            autoCapitalize="none"
            value={formData[field.key]}
            placeholderTextColor={Colors.light.placeholder}
            onBlur={() => {
              if (!formData[field.key]) {
                setShowError((prev) => ({ ...prev, [field.key]: true }));
              }
            }}
            onChange={() => {
              if (showError[field.key]) {
                setShowError((prev) => ({ ...prev, [field.key]: false }));
              }
            }}
            rightIcon={
              field.secure && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <IconSymbol
                    name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
                    size={20}
                    color={Colors.light.icon}
                  />
                </TouchableOpacity>
              )
            }
            showError={showError[field.key]}
            error={
              showError
                ? 'Por favor, complete el campo ' + field.label.toLocaleLowerCase()
                : undefined
            }
          />
        );
      })}
      <TouchableOpacity
        style={!hasUsername || !hasPassword ? $disabledButton : $button}
        onPress={handleSubmit}
      >
        {/* Loading indicator */}
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

const $button: ViewStyle = {
  backgroundColor: Colors.light.tint,
  height: 50,
  borderRadius: 5,
  width: '80%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
};

const $disabledButton: ViewStyle = {
  ...$button,
  backgroundColor: Colors.dark.disable,
};
