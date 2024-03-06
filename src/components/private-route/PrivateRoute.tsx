import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';

export function PrivateRoute(props: PrivateRouteProps) {
  const {authStatus, children} = props;

  return authStatus === AuthStatus.auth ?
    children :
    <Navigate to={AppRoute.login}/>;
}

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element | null;
}
