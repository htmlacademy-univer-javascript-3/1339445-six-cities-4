import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { CitiesCardList } from '../../components/cards/cities-card-list/CitiesCardList';
import { LocationRows } from '../../components/locations-row/LocationsRow';
import { useAppSelector } from '../../hooks/useAppSelector';

export function MainScreen() {
  const {authorizationStatus, offers} = useAppSelector((state) => state);
  // const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {
                  authorizationStatus === AuthStatus.auth ? (
                    <>
                      <li className="header__nav-item user">
                        <Link
                          className="header__nav-link header__nav-link--profile"
                          to={AppRoute.favorites}
                        >
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                          <span className="header__user-name user__name">
                            Oliver.conner@gmail.com
                          </span>
                          <span className="header__favorite-count">{offers.filter((offer) => offer.isFavorite).length}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to="/logout"
                          onClick={
                            (e) => {
                              e.preventDefault();
                              // dispatch(logout) // TODO
                            }
                          }
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )
                }

              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className={`page__main page__main--index${offers.length === 0 && ' page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationRows/>
        </div>
        <CitiesCardList/>
      </main>
    </div>
  );
}
