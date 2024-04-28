import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { cities } from "../../mocks/city";
import { changeCity } from "../../store/action";
import { offers } from "../../mocks/offers";

export function LocationRows() {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map(city => (
            <li className="locations__item">
              <Link
                className={`locations__item-link tabs__item${city.title === activeCity.title ? ' tabs__item--active' : ''}`}
                to=""
                onClick={
                  event => {
                    event.preventDefault();
                    if (city.title !== activeCity.title) dispatch(changeCity({city, offers}))
                  }
                }
              >
                <span>{city.title}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

