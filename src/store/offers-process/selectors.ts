import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { City } from '../../types/map';
import { OfferPreview } from '../../types/offer';
import { State } from '../../types/state';

export const getCityName = (state: State): City['name'] => state[NameSpace.Offers].cityName;
export const getIsOffersLoading = (state: State): boolean => state[NameSpace.Offers].isOffersLoading;
export const getActiveOffer = (state: State): OfferPreview | null => state[NameSpace.Offers].activeOffer;
export const getOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].offers;

export const getFavoriteOffers = createSelector(
  [getOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);
