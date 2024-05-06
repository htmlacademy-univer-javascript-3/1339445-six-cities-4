import { OfferType } from '../const';
import { City, Location } from './map';
import { User } from './user';


export type OfferBase = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
}

export type OfferPreview = OfferBase & {
  previewImage: string;
}

export type OfferFull = OfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
}
