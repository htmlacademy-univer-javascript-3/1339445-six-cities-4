import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector';

export function PrivateRoute({children}: PrivateRouteProps) {
  const {authorizationStatus} = useAppSelector((state) => state);


  return authorizationStatus === AuthStatus.auth ?
    children :
    <Navigate to={AppRoute.login}/>;
}

type PrivateRouteProps = {
  children: JSX.Element | null;
}
