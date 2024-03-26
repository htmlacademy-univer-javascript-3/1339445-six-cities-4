import { AppRoute } from '../../../const';
import { Offer } from '../../../types/offer';

export function getOfferLink(offerId: Offer['id']) {
  return AppRoute.offerItem.replace(':id', String(offerId));
}
