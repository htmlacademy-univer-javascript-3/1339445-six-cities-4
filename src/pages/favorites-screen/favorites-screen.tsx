import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FavoritesCardList } from '../../components/cards/favorites-card-list/favorites-card-list';
import { Header } from '../../components/header/header';
import { useEffect, useState } from 'react';
import { OfferPreview } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { getOffers } from '../../store/offers-process/selectors';

export function FavoritesScreen() {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);

  // undefined - ждём загрузки. null - ошибка запроса (не найдено)
  const [favoriteOffers, setFavoriteOffers] = useState<OfferPreview[] | null | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchFavoriteOffers()).then((action) => {
      if (fetchFavoriteOffers.fulfilled.match(action)) {
        setFavoriteOffers(action.payload);
      } else {
        setFavoriteOffers(null);
      }
    });
  }, [dispatch, offers]);

  const isEmpty = favoriteOffers ? favoriteOffers.length === 0 : true;

  return (
    <div className={`page${isEmpty ? ' page--favorites-empty' : ''}`}>
      <Header/>
      <main className={`page__main page__main--favorites${isEmpty ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <FavoritesCardList favoriteOffers={favoriteOffers || []}/>
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
