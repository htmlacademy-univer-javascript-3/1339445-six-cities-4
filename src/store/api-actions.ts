import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus } from '../const';
import { changeAuthorizationStatus, changeIsOffersLoading, changeOffers, redirectToRoute } from './action';
import { OfferPreview } from '../types/offer';
import { AuthData, UserData } from '../types/auth';
import { saveToken } from '../services/token';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(changeIsOffersLoading(true));
    const {data} = await api.get<OfferPreview[]>(APIRoute.offers());
    dispatch(changeOffers(data));
    dispatch(changeIsOffersLoading(false));
  },
);


export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.login());
      dispatch(changeAuthorizationStatus(AuthStatus.auth));
    } catch {
      dispatch(changeAuthorizationStatus(AuthStatus.noAuth));
    }
  },
);

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (authData, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.login(), authData);
    saveToken(data.token);
    dispatch(changeAuthorizationStatus(AuthStatus.auth));
    dispatch(redirectToRoute(AppRoute.root));
  },
);
