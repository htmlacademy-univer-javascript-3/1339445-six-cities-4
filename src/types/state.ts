import { AuthStatus } from '../const.js';
import {store} from '../store/index.js';
import { UserData } from './auth.js';
import { City } from './map.js';
import { OfferPreview } from './offer.js';

export type AuthState = {
  authorizationStatus: AuthStatus;
  userData: UserData | null;
}

export type OffersState = {
  cityName: City['name'];
  offers: OfferPreview[];
  activeOffer: OfferPreview | null;
  isOffersLoading: boolean;
}

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;
