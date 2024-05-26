import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getIsAuth } from '../../store/auth-process/selectors';

export function PrivateRoute({children}: PrivateRouteProps) {
  const isAuth = useAppSelector(getIsAuth);

  return isAuth ? children : <Navigate to={AppRoute.login}/>;
}

type PrivateRouteProps = {
  children: JSX.Element | null;
}
