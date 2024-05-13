import { OfferBase } from './types/offer';

export const enum AppRoute {
  root = '/',
  login = '/login',
  favorites = '/favorites',
  offerItem = '/offer/:id',
}

export enum AuthStatus {
  auth = 'auth',
  noAuth = 'noAuth',
  unknown = 'unknown',
}

export enum OfferType {
  apartment = 'Apartment',
  room = 'Room',
  house = 'House',
  hotel = 'Hotel'
}

export const enum LeafletSettings {
  URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}

export const APIRoute = {
  // offers
  offers: () => '/offers',
  offer: (offerId: OfferBase['id']) => `/offers/${offerId}`,
  offersNearby: (offerId: OfferBase['id']) => `/offers/${offerId}/nearby`,

  // favorite
  favorite: () => '/favorite',
  favoriteStatus: (offerId: OfferBase['id'], status: number) => `/favorite/${offerId}/${status}`,

  // comments
  comments: (offerId: OfferBase['id']) => `/comments/${offerId}`,

  // user
  login: () => '/login',
  logout: () => '/logout',
};

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
