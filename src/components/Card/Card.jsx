import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../AppContext';

//react skeleton библиотека - для создания скелета карточки, отображается пока карточка не прогрузится

import unliked from './../../img/unliked.svg';
import liked from './../../img/liked.svg';
import plus from './../../img/plus.svg';
import cheked from './../../img/cheked.svg';
import st from './Card.module.scss';

function Card({
  id,
  imgUrl,
  title,
  price,
  alt,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  //debugger

  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, title, imgUrl, price, parentId: id, favoriteId: id };

  const onHandle = () => {
    onPlus(obj);
  };
  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={st.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#F2F2F2"
          foregroundColor="#ffffff">
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="105" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="125" rx="3" ry="3" width="95" height="15" />
          <rect x="0" y="160" rx="8" ry="8" width="80" height="25" />
          <rect x="118" y="154" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onPlus && (
            <div className={st.favorite}>
              <img
                onClick={onClickFavorite}
                width={32}
                height={32}
                src={isFavorite ? liked : unliked}
                alt="unliked"
              />
            </div>
          )}
          <img width={133} height={112} src={imgUrl} alt={alt} />
          <p>{title}</p>
          <div className={st.price}>
            <div className={st.priceText}>
              <span>Price:</span>
              <b>{price} $</b>
            </div>
            {onPlus && (
              <img
                className={st.plus}
                onClick={onHandle}
                width={32}
                height={32}
                src={isItemAdded(id) ? cheked : plus}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
