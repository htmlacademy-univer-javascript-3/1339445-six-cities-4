import { AuthStatus } from '../../../const';
import { Review } from '../../../types/review';
import { ReviewItem } from '../review-item/ReviewItem';
import { ReviewsForm } from '../reviews-form/ReviewsForm';

export function ReviewsList({reviews, authStatus}: ReviewsListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {
          reviews.map(
            (review) => <ReviewItem review={review} key={review.id}/>
          )
        }
      </ul>
      {
        authStatus === AuthStatus.auth && (
          <ReviewsForm />
        )
      }
    </section>
  );
}

type ReviewsListProps = {
  reviews: Review[];
  authStatus: AuthStatus;
}
