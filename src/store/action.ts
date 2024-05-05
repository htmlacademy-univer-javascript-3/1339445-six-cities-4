import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/map';
import { OfferPreview } from '../types/offer';

export const changeCity = createAction<{city: City; offers: OfferPreview[]}>('changeCity');
export const changeOffers = createAction<{offers: OfferPreview[]}>('changeOffers');
export const changeActiveOffer = createAction<{activeOffer: OfferPreview | null}>('changeActiveOffer');
