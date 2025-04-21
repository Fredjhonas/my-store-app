import { Colors } from '@/constants/Colors';
import React from 'react';
import { Button, Modal, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';

type AlertModalProps = {
  title: string;
  visible: boolean;
  type?: 'success' | 'error' | 'info' | 'warning' | null;
  message: string;
  onClose?: () => void;
};

const AlertModal = ({ title, visible, type = 'success', message, onClose }: AlertModalProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✔️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return null;
    }
  };

  return (
    <Modal animationType="fade" visible={visible} onRequestClose={onClose} transparent>
      <View style={$container}>
        <View style={$modalContainer}>
          <View style={$header}>
            <ThemedText type="title">{title}</ThemedText>
            <ThemedText type="title">{getIcon()}</ThemedText>
          </View>
          <ThemedText>{message}</ThemedText>
          <Button onPress={onClose} title="Cerrar" color={Colors.light.tint} />
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const $modalContainer: ViewStyle = {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 30,
  alignItems: 'center',
  gap: 20,
};

const $header: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
};
