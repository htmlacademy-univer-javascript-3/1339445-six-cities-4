import { OfferType } from '../const';
import { Offer, OffersByCity } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 'offer-uuid-1',
    title: 'Beautiful & luxurious apartment at great location',
    type: OfferType.apartment,
    isPremium: true,
    rating: 4.8,
    price: 120,
    pricePer: 'night',
    gallery: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/studio-01.jpg',
    ],
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    bookmark: true,
    point: {
      lat: 52.3909553943508,
      lng: 4.85309666406198,
    },
  },

  {
    id: 'offer-uuid-2',
    title: 'Wood and stone place',
    type: OfferType.room,
    isPremium: false,
    rating: 4.7,
    price: 80,
    pricePer: 'night',
    gallery: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/studio-01.jpg',
    ],
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Kitchen',
      'Cabel TV',
      'Fridge',
    ],
    bookmark: false,
    point: {
      lat: 52.3609553943508,
      lng: 4.85309666406198,
    },
  },

  {
    id: 'offer-uuid-3',
    title: 'Canal View Prinsengracht',
    type: OfferType.apartment,
    isPremium: false,
    rating: 4.5,
    price: 132,
    pricePer: 'night',
    gallery: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
    ],
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    bookmark: true,
    point: {
      lat: 52.3909553943508,
      lng: 4.929309666406198,
    },
  },

  {
    id: 'offer-uuid-4',
    title: 'Nice, cozy, warm big bed apartment',
    type: OfferType.apartment,
    isPremium: true,
    rating: 4.9,
    price: 180,
    pricePer: 'night',
    gallery: [
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    bookmark: false,
    point: {
      lat: 52.3809553943508,
      lng: 4.939309666406198,
    },
  },
];

export const offersByCityList: OffersByCity[] = [
  {
    city: 'Amsterdam',
    offers: offers.slice(0, 2),
  },
  {
    city: 'Cologne',
    offers: offers.slice(2),
  },
];
