import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { starsData } from './const';
import { useAppDispatch } from '../../../hooks/use-app-selector';
import { uploadComment } from '../../../store/api-actions';
import { OfferBase } from '../../../types/offer';

export function ReviewsForm({offerId}: ReviewsFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rating: -1,
    review: '',
  });

  function handleFieldChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.target === null) {
      return;
    }
    const {name, value} = e.target;
    if (name === 'rating') {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

  }

  function isFormValid(): boolean {
    if (formData.rating === -1) {
      // 'Fill the stars'
      return false;
    }
    if (formData.review.length < 50 || formData.review.length > 300) {
      // 'Your comment must contain from 50 to 300 caracters'
      return false;
    }
    return true;
  }

  function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid()) {
      // eslint-disable-next-line no-alert
      alert('Incorrect form data');
      return;
    }
    const reviewToUpload = {
      rating: formData.rating,
      comment: formData.review
    };
    dispatch(uploadComment({offerId, comment: reviewToUpload}))
      .then((action) => {
        if (uploadComment.fulfilled.match(action)) {
          setFormData({
            rating: -1,
            review: '',
          });
          // eslint-disable-next-line no-alert
          alert('Review uploaded!');
        } else {
          // eslint-disable-next-line no-alert
          alert('Error occured. Review was not uploaded.');
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert
        alert('Error occured. Review was not uploaded.');
      });
  }

  function drawStars() {
    return starsData.map((item) => (
      <Fragment key={item.value}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={item.value}
          id={`${item.value}-stars`}
          type="radio"
          onChange={handleFieldChange}
          checked={formData.rating === item.value}
        />
        <label
          htmlFor={`${item.value}-stars`}
          className="reviews__rating-label form__rating-label"
          title={item.text}
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </Fragment>
    ));
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        { drawStars() }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

type ReviewsFormProps = {
  offerId: OfferBase['id'];
}
