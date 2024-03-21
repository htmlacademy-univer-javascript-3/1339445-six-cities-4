import { Offer } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';

export function NearPlacesCard({offer, activeOfferId, setActiveOfferId}: NearPlacesCardProps) {
  return (
    <OfferCard
      offer={offer}
      cardType={CardType.nearPlaces}
      activeOfferId={activeOfferId}
      setActiveOfferId={setActiveOfferId}
    />
  );
}

type NearPlacesCardProps = {
  offer: Offer;
  activeOfferId?: Offer['id'] | null;
  setActiveOfferId?: CallableFunction;
}
