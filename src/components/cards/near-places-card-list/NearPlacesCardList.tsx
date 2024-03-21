import { useState } from 'react';
import { Offer } from '../../../types/offer';
import { NearPlacesCard } from '../near-places-card/NearPlacesCard';

export function NearPlacesCardList({offers}: NearPlacesCardListProps) {
  const [activeOfferId, setActiveOfferId] = useState(null);

  return (
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <NearPlacesCard
            offer={offer}
            key={offer.id}
            activeOfferId={activeOfferId}
            setActiveOfferId={setActiveOfferId}
          />
        ))
      }
    </div>
  );
}

type NearPlacesCardListProps = {
  offers: Offer[];
}
