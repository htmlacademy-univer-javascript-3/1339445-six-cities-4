import { useState } from 'react';
import { Offer } from '../../../types/offer';
import { CitiesCard } from '../cities-card/CitiesCard';

export function CitiesCardList({offers}: CitiesCardListProps) {
  const [activeOfferId, setActiveOfferId] = useState(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <CitiesCard
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

type CitiesCardListProps = {
  offers: Offer[];
}
