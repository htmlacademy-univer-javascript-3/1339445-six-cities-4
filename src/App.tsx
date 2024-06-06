import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainScreen } from './pages/main-screen/main-screen';
import { LoginScreen } from './pages/login-screen/login-screen';
import { FavoritesScreen } from './pages/favorites-screen/favorites-screen';
import { AppRoute } from './const';
import { OfferScreen } from './pages/offer-screen/offer-screen';
import { Page404NotFound } from './pages/page-404-not-found/page-404-not-found';
import { PrivateRoute } from './components/private-route/private-route';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=''>
          <Route path={AppRoute.root} element={<MainScreen/>} />
          <Route path={AppRoute.login} element={<LoginScreen />}/>
          <Route path={AppRoute.favorites} element={
            <PrivateRoute>
              <FavoritesScreen/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.offerItem} element={<OfferScreen/>} />
        </Route>
        <Route path='*' element={<Page404NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
