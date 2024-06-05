import { Link, useNavigate } from 'react-router-dom';
import { OfferPreview } from '../../../types/offer';
import { CardType, cardParametersMap } from './const';
import { getOfferLink } from './utils';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { changeActiveOffer } from '../../../store/offers-process/offers-process';
import { memo } from 'react';
import { getIsAuth } from '../../../store/auth-process/selectors';
import { changeFavoriteStatus } from '../../../store/api-actions';
import { AppRoute } from '../../../const';

function OfferCard({offer, cardType}: OfferCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  const params = cardParametersMap[cardType];

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseOver={ () => dispatch(changeActiveOffer(offer)) }
      onMouseOut={ () => dispatch(changeActiveOffer(null)) }
    >
      {
        params.drawPremium && offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={getOfferLink(offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={params.image.width}
            height={params.image.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardType}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => {
              if (isAuth) {
                const newStatus = !offer.isFavorite;
                dispatch(changeFavoriteStatus({offerId: offer.id, isFavorite: newStatus}));
              } else {
                navigate(AppRoute.login);
              }
            }}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) / 5 * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getOfferLink(offer.id)}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

type OfferCardProps = {
  offer: OfferPreview;
  cardType: CardType;
}

export default memo(OfferCard);
