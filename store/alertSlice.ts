import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | null;
}

const initialState: AlertState = {
  title: '',
  message: '',
  type: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.title = '';
      state.message = '';
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

export const selectAlert = (state: { alert: AlertState }) => state.alert;
export const selectAlertVisible = (state: { alert: AlertState }) => !!state.alert.type;
