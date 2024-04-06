import { Marker } from './types/map';
import { Offer } from './types/offer';

export function getMarkerFromOffer(offer: Offer): Marker {
  return {
    title: offer.title,
    point: offer.point,
  };
}

export function getMarkersFromOffers(offers: Offer[]): Marker[] {
  return offers.map(
    (offer) => getMarkerFromOffer(offer)
  );
}
