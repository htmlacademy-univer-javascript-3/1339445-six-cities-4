import { City } from '../types/map';

const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const cities: City[] = cityNames.map((cityName) => ({
  title: cityName,
  location: {
    latitude: 52.38,
    longitude: 4.90,
    zoom: 11,
  },
}));
