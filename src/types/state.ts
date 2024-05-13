import {store} from '../store/index.js';
import { City } from './map.js';
import { OfferPreview } from './offer.js';

export type State = {
  cityName: City['name'];
  offers: OfferPreview[];
  activeOffer: OfferPreview | null;
  isOffersLoading: boolean;
}

export type AppDispatch = typeof store.dispatch;
