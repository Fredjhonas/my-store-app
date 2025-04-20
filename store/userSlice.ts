import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: {
    token: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const selectIsLoggedIn = (state: { user: UserState }) => !!state.user.user;
export const selectIsLoggedOut = (state: { user: UserState }) => !state.user.user;
export const selectUser = (state: { user: UserState }) => state.user.user;
