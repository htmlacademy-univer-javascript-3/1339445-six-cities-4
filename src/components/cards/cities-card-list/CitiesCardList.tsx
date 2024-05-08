import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';
import { getMarkersFromOffers } from '../../../utils';
import { Map } from '../../map/Map';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { SortingVariants } from '../../sorting-variants/SortingVariants';
import { useState } from 'react';
import { SortBy, sortingFunc } from '../../sorting-variants/const';

export function CitiesCardList() {
  const {city, offers, activeOffer} = useAppSelector((state) => state);
  const [sorting, setSorting] = useState(SortBy.Popular);

  if (offers.length === 0) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
              We could not find any property available at the moment in Dusseldorf
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  }

  const selectedMarker = activeOffer ? getMarkersFromOffers([activeOffer])[0] : null;
  const sortedOffers = sortingFunc.get(sorting)!(offers);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} places to stay in {city.title}</b>
          <SortingVariants sorting={sorting} setSorting={setSorting}/>
          <div className="cities__places-list places__list tabs__content">
            {
              sortedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  cardType={CardType.cities}
                />
              ))
            }
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={city} markers={getMarkersFromOffers(sortedOffers)} selectedMarker={selectedMarker} />
          </section>
        </div>
      </div>
    </div>
  );
}
