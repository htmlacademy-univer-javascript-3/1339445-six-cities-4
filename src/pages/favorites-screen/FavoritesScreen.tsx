import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FavoritesCardList } from '../../components/cards/favorites-card-list/FavoritesCardList';
import { Header } from '../../components/header/Header';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getFavoriteOffers } from '../../store/offers-process/selectors';

export function FavoritesScreen() {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const isEmpty = favoriteOffers.length === 0;

  return (
    <div className={`page${isEmpty && ' page--favorites-empty'}`}>
      <Header/>
      <main className={`page__main page__main--favorites${isEmpty && ' page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          <FavoritesCardList favoriteOffers={favoriteOffers}/>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.root}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}
