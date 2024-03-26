import { useState } from 'react';
import { Offer } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';

export function CitiesCardList({offers}: CitiesCardListProps) {
  const [activeOfferId, setActiveOfferId] = useState(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <OfferCard
            offer={offer}
            key={offer.id}
            activeOfferId={activeOfferId}
            setActiveOfferId={setActiveOfferId}
            cardType={CardType.cities}
          />
        ))
      }
    </div>
  );
}

type CitiesCardListProps = {
  offers: Offer[];
}
