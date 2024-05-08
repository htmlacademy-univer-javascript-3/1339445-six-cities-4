import { OfferPreview } from '../../types/offer';

export const enum SortBy {
  Popular = 'Popular',
  PriceFromLow = 'PriceFromLow',
  PriceFromHigh = 'PriceFromHigh',
  TopRatedFirst = 'TopRatedFirst',
}

export const sortingText = new Map([
  [SortBy.Popular, 'Popular'],
  [SortBy.PriceFromLow, 'Price: low to high'],
  [SortBy.PriceFromHigh, 'Price: high to low'],
  [SortBy.TopRatedFirst, 'Top rated first'],
]);

type SortingFuncType = (offerPreviewArray: OfferPreview[]) => OfferPreview[]
export const sortingFunc = new Map<SortBy, SortingFuncType>([
  [SortBy.Popular, (offers) => offers], // not copy!!
  [SortBy.PriceFromLow, (offers) => offers.toSorted((a, b) => a.price - b.price)],
  [SortBy.PriceFromHigh, (offers) => offers.toSorted((a, b) => b.price - a.price)],
  [SortBy.TopRatedFirst, (offers) => offers.toSorted((a, b) => b.rating - a.rating)],
]);
