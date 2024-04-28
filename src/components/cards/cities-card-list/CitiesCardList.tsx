import { OfferCard } from '../offer-card/OfferCard';
import { CardType } from '../offer-card/const';
import { getMarkersFromOffers } from '../../../utils';
import { Map } from '../../map/Map';
import { useAppSelector } from '../../../hooks/useAppSelector';

export function CitiesCardList() {
  const {city, offers, activeOffer} = useAppSelector((state) => state);

  const selectedMarker = activeOffer ? getMarkersFromOffers([activeOffer])[0] : null;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.title}</b>
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
            <Map city={city} markers={getMarkersFromOffers(offers)} selectedMarker={selectedMarker} />
          </section>
        </div>
      </div>
    </div>
  );
}
