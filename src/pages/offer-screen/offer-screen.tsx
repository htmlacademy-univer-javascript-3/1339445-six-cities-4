import { useNavigate, useParams } from 'react-router-dom';
import { Page404NotFound } from '../page-404-not-found/page-404-not-found';
import { NearPlacesCardList } from '../../components/cards/near-places-card-list/near-places-card-list';
import { ReviewsList } from '../../components/reviews/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { changeFavoriteStatus, fetchComments, fetchOffer, fetchOffersNearby } from '../../store/api-actions';
import { Header } from '../../components/header/header';
import { useEffect, useState } from 'react';
import { OfferBase, OfferFull, OfferPreview } from '../../types/offer';
import { Review } from '../../types/review';
import { Spinner } from '../../components/spinner/spinner';
import { getActiveOffer } from '../../store/offers-process/selectors';
import { getIsAuth } from '../../store/auth-process/selectors';
import { AppRoute } from '../../const';

export function OfferScreen() {
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const activeOffer = useAppSelector(getActiveOffer);
  const isAuth = useAppSelector(getIsAuth);

  // undefined - ждём загрузки. null - ошибка запроса (не найдено)
  const [offer, setOffer] = useState<OfferFull | null | undefined>(undefined);
  const [offersNearby, setOffersNearby] = useState<OfferPreview[] | null | undefined>(undefined);
  const [comments, setComments] = useState<Review[] | null | undefined>(undefined);

  const offerId = params.id;
  if (offerId === undefined) {
    return <Page404NotFound/>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch(fetchOffer(offerId)).then((action) => {
      if (fetchOffer.fulfilled.match(action)) {
        setOffer(action.payload);
      } else {
        setOffer(null);
      }
    });

    dispatch(fetchOffersNearby(offerId)).then((action) => {
      if (fetchOffersNearby.fulfilled.match(action)) {
        setOffersNearby(action.payload);
      } else {
        setOffersNearby(null);
      }
    });

    dispatch(fetchComments(offerId)).then((action) => {
      if (fetchComments.fulfilled.match(action)) {
        setComments(action.payload);
      } else {
        setOffersNearby(null);
      }
    });
  }, [dispatch, offerId]);

  if (offer === null) {
    return <Page404NotFound/>;
  }

  function renderComments() {
    if (comments === undefined) {
      return <Spinner/>;
    }
    if (comments === null) {
      return <div>Comments not found</div>;
    }
    return (
      <ReviewsList reviews={comments} offerId={offerId!}/>
    );
  }

  function renderOffer() {
    if (offer === undefined) {
      return <Spinner/>;
    }
    if (offer === null) {
      return null;
    } // will never happen

    function renderOffersNearbyMap() {
      if (offersNearby === undefined) {
        return <Spinner/>;
      }
      if (offersNearby === null) {
        return null;
      }
      const markers = Array<OfferBase>(...offersNearby.slice(0, 3), offer!);
      return (
        <section className="offer__map map">
          <Map city={offer!.city} offers={markers} selectedOffer={activeOffer} />
        </section>
      );
    }

    return (
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              offer.images.map((src, index) => (
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
                {offer.title}
              </h1>
              <button
                className={`offer__bookmark-button${offer.isFavorite ? ' offer__bookmark-button--active' : ''} button`}
                type="button"
                onClick={() => {
                  if (isAuth) {
                    const newStatus = !offer.isFavorite;
                    dispatch(changeFavoriteStatus({offerId: offer.id, isFavorite: newStatus}));
                    setOffer({
                      ...offer,
                      isFavorite: newStatus,
                    });
                  } else {
                    navigate(AppRoute.login);
                  }
                }}
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${Math.round(offer.rating) / 5 * 100}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{offer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {
                  offer.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>{item}</li>
                  ))
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper${offer.host.isPro && ' offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                { offer.host.isPro && <span className="offer__user-status">Pro</span> }
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            { renderComments() }
          </div>
        </div>
        { renderOffersNearbyMap() }
      </section>
    );
  }

  function renderOffersNearby() {
    function innerRender() {
      if (offersNearby === undefined) {
        return <Spinner/>;
      }
      if (offersNearby === null) {
        return <div>Cannot load offers nearby</div>;
      }
      return <NearPlacesCardList offers={offersNearby.slice(0, 3)}/>;
    }

    return (
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        { innerRender() }
      </section>
    );
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        { renderOffer() }
        <div className="container">
          { renderOffersNearby() }
        </div>
      </main>
    </div>
  );
}
