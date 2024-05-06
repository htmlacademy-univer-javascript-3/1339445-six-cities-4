import { offerPreviewList } from './mocks/offers';
import { City, Marker } from './types/map';
import { OfferBase, OfferPreview } from './types/offer';

export function getMarkerFromOffer(offer: OfferBase): Marker {
  return {
    title: offer.title,
    location: offer.location,
  };
}

export function getMarkersFromOffers(offers: OfferBase[]): Marker[] {
  return offers.map(
    (offer) => getMarkerFromOffer(offer)
  );
}

export function getOffersByCity(city: City): OfferPreview[] {
  return offerPreviewList.filter((offer) => offer.city.title === city.title);
}

export function groupOffersByCity(offers: OfferPreview[]) {
  const offersByCity = new Map<City['title'], OfferPreview[]>();
  for (const offer of offers) {
    const cityTitle = offer.city.title;
    let array = offersByCity.get(cityTitle);
    if (array === undefined) {
      array = new Array<OfferPreview>();
      offersByCity.set(cityTitle, array);
    }
    array.push(offer);
  }

  return offersByCity;
}
