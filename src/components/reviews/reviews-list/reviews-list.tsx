import { useAppSelector } from '../../../hooks/use-app-selector';
import { getIsAuth } from '../../../store/auth-process/selectors';
import { OfferBase } from '../../../types/offer';
import { Review } from '../../../types/review';
import { ReviewItem } from '../review-item/review-item';
import { ReviewsForm } from '../reviews-form/reviews-form';

export function ReviewsList({reviews, offerId}: ReviewsListProps) {
  const isAuth = useAppSelector(getIsAuth);
  const reviewsToShow = reviews
    .toSorted((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateB > dateA) {
        return 1;
      } else if (dateB < dateA) {
        return -1;
      }
      return 0;
    })
    .slice(0, 10);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {
          reviewsToShow.map(
            (review) => <ReviewItem review={review} key={review.id}/>
          )
        }
      </ul>
      {
        isAuth && <ReviewsForm offerId={offerId} />
      }
    </section>
  );
}

type ReviewsListProps = {
  reviews: Review[];
  offerId: OfferBase['id'];
}
