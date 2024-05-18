import { cityNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { changeCityName } from '../../store/action';
import { City } from '../../types/map';

export function LocationRows() {
  const activeCityName = useAppSelector((state) => state.cityName);
  const dispatch = useAppDispatch();

  function createLocationItem(cityName: City['name']) {
    let buttonClassName = 'locations__item-link tabs__item';
    let buttonOnClick = () => {
      dispatch(changeCityName(cityName));
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

