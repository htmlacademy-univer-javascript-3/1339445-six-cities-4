import { useState } from 'react';
import { Offer } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';

export function NearPlacesCardList({offers}: NearPlacesCardListProps) {
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);

  return (
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <OfferCard
            offer={offer}
            key={offer.id}
            activeOfferId={activeOfferId}
            setActiveOfferId={setActiveOfferId}
            cardType={CardType.nearPlaces}
          />
        ))
      }
    </div>
  );
}

type NearPlacesCardListProps = {
  offers: Offer[];
}
