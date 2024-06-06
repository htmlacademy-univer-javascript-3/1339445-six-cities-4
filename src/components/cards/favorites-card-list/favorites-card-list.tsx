import { Link } from 'react-router-dom';
import { OfferPreview } from '../../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { CardType } from '../offer-card/const';
import { City } from '../../../types/map';
import { ReactNode } from 'react';
import { groupOffersByCity } from '../../../utils';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { Spinner } from '../../spinner/spinner';
import { getIsOffersLoading } from '../../../store/offers-process/selectors';

export function FavoritesCardList({favoriteOffers}: FavoritesCardListProps) {
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  if (isOffersLoading) {
    return (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <Spinner/>
      </section>
    );
  }

  if (favoriteOffers.length === 0) {
    return (
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
        </div>
      </section>
    );
  }
  const offersByCity = groupOffersByCity(favoriteOffers);

  function locationItems(city: City, offersList: OfferPreview[]) {
    if (offersList.length === 0) {
      return null;
    }
    return (
      <li className="favorites__locations-items" key={city.name}>
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
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        { renderFavoritesList() }
      </ul>
    </section>
  );
}


type FavoritesCardListProps = {
  favoriteOffers: OfferPreview[];
}
