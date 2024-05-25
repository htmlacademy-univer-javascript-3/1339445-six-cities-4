import { CitiesCardList } from '../../components/cards/cities-card-list/CitiesCardList';
import { Header } from '../../components/header/Header';
import { LocationRows } from '../../components/locations-row/LocationsRow';
import { useAppSelector } from '../../hooks/useAppSelector';

export function MainScreen() {
  const offers = useAppSelector((state) => state.offers);

  return (
    <div className="page page--gray page--main">
      <Header/>
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
