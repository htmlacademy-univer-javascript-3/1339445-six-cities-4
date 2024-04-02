import { OfferType } from '../const';
import { Point } from './map';

export type User = {
  username: string;
  image: string;
}

export type Review = {
  date: string;
  text: string;
  rating: number;
  user: User;
}

export type Offer = {
  id: number;
  name: string;
  type: OfferType;
  isPremium: boolean;
  rating: number;
  price: number;
  pricePer: string;
  gallery: string[];
  whatsInside: string[];
  reviews: Review[];
  bookmark: boolean;
  point: Point;
}

export type OffersByCity = {
  city: string;
  offers: Offer[];
}
