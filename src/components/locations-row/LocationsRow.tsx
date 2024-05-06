import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { cities } from '../../mocks/city';
import { changeCity } from '../../store/action';
import { City } from '../../types/map';
import { getOffersByCity } from '../../utils';

export function LocationRows() {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  function createLocationItem(city: City) {
    let buttonClassName = 'locations__item-link tabs__item';
    let buttonOnClick = () => {
      dispatch(changeCity({city, offers: getOffersByCity(city)}));
    };

    if (city.title === activeCity.title) {
      buttonClassName = 'locations__item-link tabs__item tabs__item--active';
      buttonOnClick = () => {};
    }

    return (
      <li className="locations__item" key={city.title}>
        <div className={buttonClassName} onClick={buttonOnClick} style={{userSelect: 'none', cursor: 'pointer'}}>
          {city.title}
        </div>
      </li>
    );
  }

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map(createLocationItem)
        }
      </ul>
    </section>
  );
}

