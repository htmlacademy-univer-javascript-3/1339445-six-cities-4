import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { changeIsOffersLoading, changeOffers } from './action';
import { OfferPreview } from '../types/offer';

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
