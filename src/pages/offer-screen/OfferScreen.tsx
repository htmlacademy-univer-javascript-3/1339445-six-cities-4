import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { offers } from '../../mocks/offers';
import { Page404NotFound } from '../page-404-not-found/Page404NotFound';
import { NearPlacesCardList } from '../../components/cards/near-places-card-list/NearPlacesCardList';
import { ReviewsForm } from '../../components/reviews-form/ReviewsForm';

export function OfferScreen() {
  const params = useParams();

  const offerOrUndefined = offers.find((o) => String(o.id) === params.id);
  if (offerOrUndefined === undefined) {
    return <Page404NotFound/>;
  }
  const offer = offerOrUndefined;

  function listOfferGallery() {
    return (
      <div className="offer__gallery">
        {
          offer.gallery.map((src, index) => (
            <div className="offer__image-wrapper" key={src + String(index)}>
              <img
                className="offer__image"
                src={src}
                alt="Photo studio"
              />
            </div>
          ))
        }
      </div>
    );
  }

  function listWhatsInside() {
    return (
      <ul className="offer__inside-list">
        {
          offer.whatsInside.map((item) => (
            <li className="offer__inside-item" key={item}>{item}</li>
          ))
        }
      </ul>
    );
  }

  function listReviews() {
    return (
      <ul className="reviews__list">
        {
          offer.reviews.map((review, index) => (
            <li className="reviews__item" key={review.user.username + String(index)}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={review.user.image}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{review.user.username}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: `${review.rating / 5 * 100}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {review.text}
                </p>
                <time className="reviews__time" dateTime="2019-04-24">
                  {review.date}
                </time>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="#todo"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#todo">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            {listOfferGallery()}
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                offer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.name}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    { offer.bookmark && <use xlinkHref="#icon-bookmark" /> }
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating / 5 * 100}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;{offer.pricePer}</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {listWhatsInside()}
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the
                    unique lightness of Amsterdam. The building is green and from
                    18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{offer.reviews.length}</span>
                </h2>
                {listReviews()}
                <ReviewsForm />
              </section>
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearPlacesCardList offers={offers.filter((o) => o.id !== offer.id)}/>
          </section>
        </div>
      </main>
    </div>
  );
}
