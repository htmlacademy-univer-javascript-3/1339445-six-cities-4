import { AuthStatus } from '../const.js';
import {store} from '../store/index.js';
import { UserData } from './auth.js';
import { City } from './map.js';
import { OfferPreview } from './offer.js';

export type State = {
  authorizationStatus: AuthStatus;
  userData: UserData | null;
  cityName: City['name'];
  offers: OfferPreview[];
  activeOffer: OfferPreview | null;
  isOffersLoading: boolean;
}

export type AppDispatch = typeof store.dispatch;
