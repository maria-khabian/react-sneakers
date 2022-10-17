import React from 'react';
import AppContext from '../../AppContext';

import st from './Favorites.module.scss'
import btnBack from '../../img/btn-back.svg';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';


function Favorites() {
    const { favorites, onAddToFavorites, onAddToCart } = React.useContext(AppContext);
    //debugger
    return (
        <div className={st.headerFavorites}>
            <div className={st.headerTitle}>
                <Link to="/">
                    <img className={st.back} src={btnBack} alt="Back" />
                </Link>
                <h1>Мои закладки</h1>
            </div>
            {/* sneakersCard cтили взяла из index.scss навесив нужный класс*/}
            <div className={st.favoritesCard}>
                {favorites
                    .map((item, index) => (
                        <Card
                            key={index}
                            favorited={true} 
                            onPlus={ (obj) => onAddToCart(obj)}
                            onFavorite={ (obj) => onAddToFavorites(obj)}
                            { ...item }/>
                    )
                    )}
            </div>

        </div>

    )
}

export default Favorites;