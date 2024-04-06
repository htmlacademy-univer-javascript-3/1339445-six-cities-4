import { OfferType } from '../const';
import { Point } from './map';


export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  isPremium: boolean;
  rating: number;
  price: number;
  pricePer: string;
  gallery: string[];
  goods: string[];
  bookmark: boolean;
  point: Point;
}

export type OffersByCity = {
  city: string;
  offers: Offer[];
}
