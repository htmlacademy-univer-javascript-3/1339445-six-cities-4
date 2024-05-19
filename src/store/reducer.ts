import { createReducer } from '@reduxjs/toolkit';
import { changeActiveOffer, changeAuthorizationStatus, changeCityName, changeIsOffersLoading, changeOffers } from './action';
import { State } from '../types/state';
import { AuthStatus, cityNames } from '../const';

const DEFAULT_CITY = cityNames[0];

const initialState: State = {
  authorizationStatus: AuthStatus.unknown,
  cityName: DEFAULT_CITY,
  offers: [],
  activeOffer: null,
  isOffersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, action) => {
      state.cityName = action.payload;
      state.activeOffer = null;
    })
    .addCase(changeOffers, (state, action) => {
      state.offers = action.payload;
      state.activeOffer = null;
    })
    .addCase(changeActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(changeIsOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
