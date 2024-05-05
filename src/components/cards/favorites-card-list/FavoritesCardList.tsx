import { Link } from 'react-router-dom';
import { OfferPreview } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';
import { offerPreviewList } from '../../../mocks/offers';
import { City } from '../../../types/map';
import { ReactNode } from 'react';
import { groupOffersByCity } from '../../../utils';

export function FavoritesCardList() {
  const favoriteOffers = offerPreviewList.filter((offer) => offer.isFavorite);
  const offersByCity = groupOffersByCity(favoriteOffers);

  function locationItems(city: City, offers: OfferPreview[]) {
    if (offers.length === 0) {
      return null;
    }
    return (
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to="#todo">
              <span>{ city.title }</span>
            </Link>
          </div>
        </div>
        <div className="favorites__places">
          {
            offers.map((offer) => (
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
    for (const offers of offersByCity.values()) {
      result.push(locationItems(offers[0].city, offers));
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
