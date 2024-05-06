import {createReducer} from '@reduxjs/toolkit';
import {changeActiveOffer, changeCity, changeOffers} from './action';
import { State } from '../types/state';
import { cities } from '../mocks/city';
import { getOffersByCity } from '../utils';

const DEFAULT_CITY = cities[0];

const initialState: State = {
  city: DEFAULT_CITY,
  offers: getOffersByCity(DEFAULT_CITY),
  activeOffer: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const {city, offers} = action.payload;
      state.city = city;
      state.offers = offers;
      state.activeOffer = null;
    })
    .addCase(changeOffers, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const {offers} = action.payload;
      state.offers = offers;
      state.activeOffer = null;
    })
    .addCase(changeActiveOffer, (state, action) => {
      const {activeOffer} = action.payload;
      state.activeOffer = activeOffer;
    });
});