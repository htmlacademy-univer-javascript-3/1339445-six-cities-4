import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { OfferBase, OfferFull, OfferPreview } from '../types/offer';
import { AuthData, UserData } from '../types/auth';
import { dropToken, saveToken } from '../services/token';
import { Review, ReviewToUpload } from '../types/review';


export const fetchOffers = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.offers());
    return data;
  },
);

export const fetchFavoriteOffers = createAsyncThunk<OfferPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.favorite());
    return data;
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

export const changeFavoriteStatus = createAsyncThunk<
  OfferPreview,
  {
    offerId: OfferBase['id'];
    isFavorite: boolean;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({offerId, isFavorite}, {extra: api}) => {
    const newStatus = Number(isFavorite);
    const {data} = await api.post<OfferPreview>(APIRoute.favoriteStatus(offerId, newStatus));
    return data;
  }
);

export const checkAuth = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.login());
      return data;
    } finally {
      dispatch(fetchOffers());
    }
  },
);

export const login = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (authData, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.login(), authData);
    saveToken(data.token);
    dispatch(fetchOffers());
    dispatch(redirectToRoute(AppRoute.root));
    return data;
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
    dispatch(fetchOffers());
    dispatch(redirectToRoute(AppRoute.root));
  },
);
