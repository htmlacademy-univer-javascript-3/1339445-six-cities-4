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

export function getOffersByCityName(offers: OfferPreview[], cityName: City['name']): OfferPreview[] {
  return offers.filter((offer) => offer.city.name === cityName);
}

export function groupOffersByCity(offers: OfferPreview[]) {
  const offersByCity = new Map<City['name'], OfferPreview[]>();
  for (const offer of offers) {
    const cityTitle = offer.city.name;
    let array = offersByCity.get(cityTitle);
    if (array === undefined) {
      array = new Array<OfferPreview>();
      offersByCity.set(cityTitle, array);
    }
    array.push(offer);
  }

  return offersByCity;
}

export function dateHumanReadable(date: Date) {
  /** "{month} {year}"*/
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
}
