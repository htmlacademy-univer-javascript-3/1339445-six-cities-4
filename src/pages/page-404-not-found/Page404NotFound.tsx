import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { Header } from '../../components/header/Header';

export function Page404NotFound() {
  return (
    <div className="page page--favorites-empty">
      <Header/>
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404: Not found</b>
              <Link className="favorites__status-description" to={AppRoute.root}>
                Return to main page
              </Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
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
