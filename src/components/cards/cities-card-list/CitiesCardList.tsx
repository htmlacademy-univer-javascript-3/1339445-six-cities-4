import { Dispatch, SetStateAction, useState } from 'react';
import { Offer } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';

export function CitiesCardList({offers, activeOfferId, setActiveOfferId}: CitiesCardListProps) {
  const [_activeOfferId, _setActiveOfferId] = useState<Offer['id'] | null>(null);
  if (activeOfferId === undefined || setActiveOfferId === undefined) {
    [activeOfferId, setActiveOfferId] = [_activeOfferId, _setActiveOfferId];
  }

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
  activeOfferId?: Offer['id'] | null;
  setActiveOfferId?: Dispatch<SetStateAction<Offer['id'] | null>>;
}
