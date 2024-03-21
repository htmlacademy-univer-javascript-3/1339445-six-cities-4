import { Link } from 'react-router-dom';
import { Offer, OffersByCity } from '../../../types/offer';
import { FavoritesCard } from '../favorites-card/FavoritesCard';
import { useState } from 'react';

export function FavoritesCardList({offersByCityList}: FavoritesCardListProps) {
  const [activeOfferId, setActiveOfferId] = useState(null);

  function locationItems(city: string, offers: Offer[]) {
    if (offers.length === 0) {
      return null;
    }
    return (
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to="#todo">
              <span>{ city }</span>
            </Link>
          </div>
        </div>
        <div className="favorites__places">
          {
            offers.map((offer) => (
              <FavoritesCard
                offer={offer}
                key={offer.id}
                activeOfferId={activeOfferId}
                setActiveOfferId={setActiveOfferId}
              />
            ))
          }
        </div>
      </li>
    );
  }

  return (
    <ul className="favorites__list">
      {offersByCityList.map(({city, offers}) => locationItems(city, offers))}
    </ul>
  );
}

type FavoritesCardListProps = {
  offersByCityList: OffersByCity[];
}
