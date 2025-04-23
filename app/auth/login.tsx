import { useAuthLogin } from '@/api/queries/login';
import LoginForm from '@/components/forms/LoginForm';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { UNEXPECTED_ERROR, USER_OR_PASSWORD_INCORRECT } from '@/constants/Messages';
import { useAlert } from '@/hooks/useAlert';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { loginRequest, isLoginPending } = useAuthLogin();
  const { showAlert } = useAlert();

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (formData: { username: string; password: string }) => {
    if (isLoginPending) return;

    loginRequest(formData, {
      onError: (error) => {
        const errorMessage = error.status === 401 ? USER_OR_PASSWORD_INCORRECT : UNEXPECTED_ERROR;

        showAlert({
          title: 'Oops!',
          message: errorMessage,
          type: 'warning',
        });
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={$container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Image source={require('@/assets/images/my-store.png')} style={{ width: 100, height: 100 }} />
      <ThemedText type="title" darkColor="black">
        Ingresar a My Store
      </ThemedText>
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={isLoginPending}
      />
    </KeyboardAvoidingView>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.light.background,
  padding: 20,
  gap: 20,
};
