import { Offer } from '../../../types/offer';
import { CardType } from '../offer-card/const';
import { OfferCard } from '../offer-card/OfferCard';

export function CitiesCard({offer, activeOfferId, setActiveOfferId}: CitiesCardProps) {
  return (
    <OfferCard
      offer={offer}
      cardType={CardType.cities}
      activeOfferId={activeOfferId}
      setActiveOfferId={setActiveOfferId}
    />

  );
}

type CitiesCardProps = {
  offer: Offer;
  activeOfferId?: Offer['id'] | null;
  setActiveOfferId?: CallableFunction;
}
