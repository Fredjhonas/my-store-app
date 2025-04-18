import LoginForm from '@/components/forms/LoginForm';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate a login request
    setTimeout(() => {
      setLoading(false);
      // Handle successful login here
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={$container}
    >
      <IconSymbol name="storefront.fill" size={60} color={Colors.light.tint} />
      <ThemedText type="title" darkColor="black">
        Ingresar a My Store
      </ThemedText>
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
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
