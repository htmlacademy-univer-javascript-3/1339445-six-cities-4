import { OfferType } from '../const';
import { Offer, OffersByCity } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    name: 'Beautiful & luxurious apartment at great location',
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
    whatsInside: [
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
    reviews: [
      {
        date: 'April 2019',
        text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        rating: 4,
        user: {
          username: 'Max',
          image: 'img/avatar-max.jpg',
        }
      },
    ],
    bookmark: true,
  },

  {
    id: 2,
    name: 'Wood and stone place',
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
    whatsInside: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Kitchen',
      'Cabel TV',
      'Fridge',
    ],
    reviews: [
      {
        date: 'April 2019',
        text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        rating: 4,
        user: {
          username: 'Max',
          image: 'img/avatar-max.jpg',
        }
      },
    ],
    bookmark: false,
  },

  {
    id: 3,
    name: 'Canal View Prinsengracht',
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
    whatsInside: [
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
    reviews: [
      {
        date: 'April 2019',
        text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        rating: 4,
        user: {
          username: 'Max',
          image: 'img/avatar-max.jpg',
        }
      },
    ],
    bookmark: true,
  },

  {
    id: 4,
    name: 'Nice, cozy, warm big bed apartment',
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
    whatsInside: [
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
    reviews: [
      {
        date: 'April 2019',
        text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        rating: 4,
        user: {
          username: 'Max',
          image: 'img/avatar-max.jpg',
        }
      },
    ],
    bookmark: false,
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
