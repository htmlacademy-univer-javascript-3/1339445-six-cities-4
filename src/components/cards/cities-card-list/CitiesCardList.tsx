import OfferCard from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';
import { getOffersByCityName } from '../../../utils';
import { Map } from '../../map/Map';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { SortingVariants } from '../../sorting-variants/SortingVariants';
import { useState } from 'react';
import { SortBy, sortingFunc } from '../../sorting-variants/const';
import { Spinner } from '../../spinner/Spinner';
import { getActiveOffer, getCityName, getIsOffersLoading, getOffers } from '../../../store/offers-process/selectors';

export function CitiesCardList() {
  const cityName = useAppSelector(getCityName);
  const offers = useAppSelector(getOffers);
  const activeOffer = useAppSelector(getActiveOffer);
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  const [sorting, setSorting] = useState(SortBy.Popular);

  if (isOffersLoading) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">
                <Spinner/>
              </b>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  }

  const currentOffers = getOffersByCityName(offers, cityName);

  if (currentOffers.length === 0) {
    return (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
              We could not find any property available at the moment in {cityName}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  }

  const city = currentOffers[0].city;
  const sortedOffers = sortingFunc.get(sorting)!(currentOffers);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} places to stay in {cityName}</b>
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
            <Map city={city} offers={sortedOffers} selectedOffer={activeOffer} />
          </section>
        </div>
      </div>
    </div>
  );
}
