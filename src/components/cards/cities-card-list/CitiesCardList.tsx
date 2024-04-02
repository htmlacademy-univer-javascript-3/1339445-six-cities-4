import { useState } from 'react';
import { Offer } from '../../../types/offer';
import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';
import { getMarkersFromOffers } from '../../../utils';
import { Map } from '../../map/Map';
import { CITY } from '../../../mocks/city';

export function CitiesCardList({offers}: CitiesCardListProps) {
  const [activeOfferId, setActiveOfferId] = useState<Offer['id'] | null>(null);

  const activeOffer = offers.find(
    (offer) => offer.id === activeOfferId
  );
  const selectedMarker = (activeOffer !== undefined) ?
    getMarkersFromOffers([activeOffer])[0] :
    null;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">312 places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
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
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={CITY} markers={getMarkersFromOffers(offers)} selectedMarker={selectedMarker} />
          </section>
        </div>
      </div>
    </div>
  );
}

type CitiesCardListProps = {
  offers: Offer[];
}
