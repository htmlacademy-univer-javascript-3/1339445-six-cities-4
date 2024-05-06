import { OfferPreview } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';

export function NearPlacesCardList({offers}: NearPlacesCardListProps) {
  return (
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <OfferCard
            offer={offer}
            key={offer.id}
            cardType={CardType.nearPlaces}
          />
        ))
      }
    </div>
  );
}

type NearPlacesCardListProps = {
  offers: OfferPreview[];
}
