import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/map';
import { Offer } from '../types/offer';

export const changeCity = createAction<{city: City; offers: Offer[]}>('changeCity');
export const changeOffers = createAction<{offers: Offer[]}>('changeOffers');
export const changeActiveOffer = createAction<{activeOffer: Offer | null}>('changeActiveOffer');
