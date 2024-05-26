import { Link } from 'react-router-dom';
import { OfferPreview } from '../../../types/offer';
import OfferCard from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';
import { City } from '../../../types/map';
import { ReactNode } from 'react';
import { groupOffersByCity } from '../../../utils';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Spinner } from '../../spinner/Spinner';
import { getFavoriteOffers, getIsOffersLoading } from '../../../store/offers-process/selectors';

export function FavoritesCardList() {
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  if (isOffersLoading) {
    return (
      <ul className="favorites__list">
        <Spinner/>
      </ul>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const offersByCity = groupOffersByCity(favoriteOffers);

  function locationItems(city: City, offersList: OfferPreview[]) {
    if (offersList.length === 0) {
      return null;
    }
    return (
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to="#todo">
              <span>{ city.name }</span>
            </Link>
          </div>
        </div>
        <div className="favorites__places">
          {
            offersList.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                cardType={CardType.favorites}
              />
            ))
          }
        </div>
      </li>
    );
  }

  function renderFavoritesList() {
    const result = new Array<ReactNode>();
    for (const offersList of offersByCity.values()) {
      result.push(locationItems(offersList[0].city, offersList));
    }
    return result;
  }

  return (
    <ul className="favorites__list">
      {
        renderFavoritesList()
      }
    </ul>
  );
}
