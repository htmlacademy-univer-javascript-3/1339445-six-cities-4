import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/map';
import { OfferPreview } from '../types/offer';

export const changeCityName = createAction<City['name']>('state/changeCityName');
export const changeOffers = createAction<OfferPreview[]>('state/changeOffers');
export const changeActiveOffer = createAction<OfferPreview | null>('state/changeActiveOffer');
export const changeIsOffersLoading = createAction<boolean>('state/changeIsOffersLoading');
