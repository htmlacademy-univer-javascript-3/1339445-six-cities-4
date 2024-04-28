import {store} from '../store/index.js';
import { City } from './map.js';
import { Offer } from './offer.js';

export type State = {
  city: City;
  offers: Offer[];
  activeOffer: Offer | null;
}

export type AppDispatch = typeof store.dispatch;
