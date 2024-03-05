import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainScreen } from './pages/main-screen/MainScreen';
import { LoginScreen } from './pages/login-screen/LoginScreen';
import { FavoritesScreen } from './pages/favorites-screen/FavoritesScreen';
import { AppRoute, AuthStatus } from './const';
import { OfferScreen } from './pages/offer-screen/OfferScreen';
import { Page404NotFound } from './pages/page-404-not-found/Page404NotFound';
import { PrivateRoute } from './components/private-route/PrivateRoute';

export function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=''>
          <Route path={AppRoute.root} element={<MainScreen placeCardNumber={props.placeCardNumber}/>} />
          <Route path={AppRoute.login} element={<LoginScreen />}/>
          <Route path={AppRoute.favorites} element={
            <PrivateRoute authStatus={AuthStatus.noAuth}>
              <FavoritesScreen />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.offerItem} element={<OfferScreen />} />
        </Route>
        <Route path='*' element={<Page404NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

type AppProps = {
  placeCardNumber: number;
}
