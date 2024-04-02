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

export const enum LeafletSettings {
  URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}
