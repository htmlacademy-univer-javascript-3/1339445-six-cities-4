import {store} from '../store/index.js';
import { City } from './map.js';
import { OfferPreview } from './offer.js';

export type State = {
  city: City;
  offers: OfferPreview[];
  activeOffer: OfferPreview | null;
}

export type AppDispatch = typeof store.dispatch;
