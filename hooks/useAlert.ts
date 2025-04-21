import { store } from '@/store';
import { AlertState, selectAlert, showAlert } from '@/store/alertSlice';
import { useEffect, useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    title: '',
    message: '',
    type: null,
  });
  const [visible, setVisible] = useState(false);

  const showAlertMessage = ({ title, message, type }: AlertState) => {
    store.dispatch(showAlert({ title, message, type }));
  };

  const hideAlertMessage = () => {
    store.dispatch(showAlert({ title: '', message: '', type: null }));
  };

  useEffect(() => {
    const subscription = store.subscribe(() => {
      const state = store.getState();
      const alert = selectAlert(state);
      setAlert(alert);
      setVisible(!!alert.type);
    });

    return () => {
      subscription();
    };
  }, []);

  return {
    alert,
    visible,
    showAlert: showAlertMessage,
    hideAlert: hideAlertMessage,
  };
};
