import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { authProcess } from './auth-process/auth-process';
import { offersProcess } from './offers-process/offers-process';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
});
