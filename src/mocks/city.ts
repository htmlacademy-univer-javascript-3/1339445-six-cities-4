import { City } from '../types/map';

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const cities: City[] = cityNames.map((cityName) => ({
  title: cityName,
  point: {
    lat: 52.38,
    lng: 4.90,
  },
  zoom: 11,
}));

export const CITY: City = cities[0];
