import { Offer } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';

export function FavoritesCard({offer, activeOfferId, setActiveOfferId}: FavoritesCardProps) {
  return (
    <OfferCard
      offer={offer}
      cardType={CardType.favorites}
      activeOfferId={activeOfferId}
      setActiveOfferId={setActiveOfferId}
    />
  );
}

type FavoritesCardProps = {
  offer: Offer;
  activeOfferId?: Offer['id'] | null;
  setActiveOfferId?: CallableFunction;
}
