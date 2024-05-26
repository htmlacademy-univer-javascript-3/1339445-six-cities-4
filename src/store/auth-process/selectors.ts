import { AuthStatus, NameSpace } from '../../const';
import { UserData } from '../../types/auth';
import { State } from '../../types/state';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.Auth].authorizationStatus;
export const getUserData = (state: State): UserData | null => state[NameSpace.Auth].userData;

export const getUserEmail = (state: State): UserData['email'] | null => {
  const userData = getUserData(state);
  return (userData !== null) ? userData.email : null;
};
export const getIsAuth = (state: State): boolean => getAuthStatus(state) === AuthStatus.auth;
