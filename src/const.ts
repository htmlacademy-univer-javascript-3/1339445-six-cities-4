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
}
