import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FavoritesCardList } from '../../components/cards/favorites-card-list/FavoritesCardList';
import { Header } from '../../components/header/Header';

export function FavoritesScreen() {
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesCardList/>
          </section>
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
