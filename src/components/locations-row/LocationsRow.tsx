import { useSearchParams } from 'react-router-dom';
import { cityNames } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getCityName } from '../../store/offers-process/selectors';
import { City } from '../../types/map';

export function LocationRows() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearch] = useSearchParams();
  const activeCityName = useAppSelector(getCityName);

  function createLocationItem(cityName: City['name']) {
    let buttonClassName = 'locations__item-link tabs__item';
    let buttonOnClick = () => {
      setSearch((prev) => ({
        ...prev,
        city: cityName,
      }));
    };

    if (cityName === activeCityName) {
      buttonClassName = 'locations__item-link tabs__item tabs__item--active';
      buttonOnClick = () => {};
    }

    return (
      <li className="locations__item" key={cityName}>
        <div className={buttonClassName} onClick={buttonOnClick} style={{userSelect: 'none', cursor: 'pointer'}}>
          { cityName }
        </div>
      </li>
    );
  }

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cityNames.map(createLocationItem)
        }
      </ul>
    </section>
  );
}

