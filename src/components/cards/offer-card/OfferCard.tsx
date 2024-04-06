import { Link } from 'react-router-dom';
import { Offer } from '../../../types/offer';
import { CardType, cardParametersMap } from './const';
import { getOfferLink } from './utils';
import { Dispatch, SetStateAction } from 'react';

export function OfferCard({offer, setActiveOfferId, cardType}: OfferCardProps) {
  const params = cardParametersMap[cardType];

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseOver={() => {
        setActiveOfferId?.(offer.id);
      }}
      onMouseOut={() => {
        setActiveOfferId?.(null);
      }}
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
            src={offer.gallery[0]}
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
            <span className="place-card__price-text">/&nbsp;{offer.pricePer}</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              { offer.bookmark && <use xlinkHref="#icon-bookmark" /> }
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / 5 * 100}%` }} />
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
  offer: Offer;
  // eslint-disable-next-line react/no-unused-prop-types
  activeOfferId?: Offer['id'] | null;
  setActiveOfferId?: Dispatch<SetStateAction<Offer['id'] | null>>;
  cardType: CardType;
}

