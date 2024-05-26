import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus } from '../const';
import { changeAuthorizationStatus, changeIsOffersLoading, changeOffers, changeUserData, redirectToRoute } from './action';
import { OfferBase, OfferFull, OfferPreview } from '../types/offer';
import { AuthData, UserData } from '../types/auth';
import { dropToken, saveToken } from '../services/token';
import { Review, ReviewToUpload } from '../types/review';

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
      const {data} = await api.get<UserData>(APIRoute.login());
      dispatch(changeAuthorizationStatus(AuthStatus.auth));
      dispatch(changeUserData(data));
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
    dispatch(changeUserData(data));
    dispatch(redirectToRoute(AppRoute.root));
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.logout());
    dropToken();
    dispatch(changeAuthorizationStatus(AuthStatus.noAuth));
    dispatch(changeUserData(null));
    dispatch(redirectToRoute(AppRoute.root));
  },
);

export const fetchOffer = createAsyncThunk<OfferFull | null, OfferBase['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId: OfferBase['id'], {extra: api}) => {
    try {
      const {data} = await api.get<OfferFull>(APIRoute.offer(offerId));
      return data;
    } catch {
      return null;
    }
  },
);

export const fetchOffersNearby = createAsyncThunk<OfferPreview[] | null, OfferBase['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (offerId: OfferBase['id'], {extra: api}) => {
    try {
      const {data} = await api.get<OfferPreview[]>(APIRoute.offersNearby(offerId));
      return data;
    } catch {
      return null;
    }
  },
);

export const fetchComments = createAsyncThunk<Review[] | null, OfferBase['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId: OfferBase['id'], {extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(APIRoute.comments(offerId));
      return data;
    } catch {
      return null;
    }
  },
);

export const uploadComment = createAsyncThunk<
  void,
  {
    offerId: OfferBase['id'];
    comment: ReviewToUpload;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/uploadComment',
  async ({offerId, comment}, {extra: api}) => {
    await api.post(APIRoute.comments(offerId), comment);
  }
);
