import { User } from './user';

export type UserData = User & {
  email: string;
  token: string;
}

export type AuthData = {
  email: string;
  password: string;
}
