import { AuthStatus } from '../../../const';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { OfferBase } from '../../../types/offer';
import { Review } from '../../../types/review';
import { ReviewItem } from '../review-item/ReviewItem';
import { ReviewsForm } from '../reviews-form/ReviewsForm';

export function ReviewsList({reviews, offerId}: ReviewsListProps) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
        authorizationStatus === AuthStatus.auth && <ReviewsForm offerId={offerId} />
      }
    </section>
  );
}

type ReviewsListProps = {
  reviews: Review[];
  offerId: OfferBase['id'];
}
