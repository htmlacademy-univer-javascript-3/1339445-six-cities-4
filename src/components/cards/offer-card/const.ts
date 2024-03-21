export enum CardType {
  cities = 'cities',
  favorites = 'favorites',
  nearPlaces = 'near-places',
}

export const cardParametersMap = {
  [CardType.cities]: {
    drawPremium: true,
    image: {
      width: 260,
      height: 200,
    },
  },

  [CardType.favorites]: {
    drawPremium: true,
    image: {
      width: 260,
      height: 200,
    },
  },

  [CardType.nearPlaces]: {
    drawPremium: false,
    image: {
      width: 150,
      height: 110,
    },
  },
};
