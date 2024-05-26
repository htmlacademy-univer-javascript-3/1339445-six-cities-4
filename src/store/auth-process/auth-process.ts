import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { AuthState } from '../../types/state';
import { checkAuth, login, logout } from '../api-actions';

const initialState: AuthState = {
  authorizationStatus: AuthStatus.unknown,
  userData: null,
};

export const authProcess = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthStatus.auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthStatus.noAuth;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthStatus.auth;
      })

      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthStatus.noAuth;
      });
  }
});
