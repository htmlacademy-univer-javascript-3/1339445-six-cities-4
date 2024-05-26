import { User } from './user';

export type ReviewBase = {
  comment: string;
  rating: number;
}

export type ReviewToUpload = ReviewBase;

export type Review = ReviewBase & {
  id: string;
  date: string;
  user: User;
}
