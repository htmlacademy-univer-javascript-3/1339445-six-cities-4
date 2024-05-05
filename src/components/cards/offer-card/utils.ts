import { AppRoute } from '../../../const';
import { OfferBase } from '../../../types/offer';

export function getOfferLink(offerId: OfferBase['id']) {
  return AppRoute.offerItem.replace(':id', String(offerId));
}
