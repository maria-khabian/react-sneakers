import React from 'react';
import { Link } from 'react-router-dom';

import logo from './../../img/logo.png';
import user from './../../img/user.svg';
import like from './../../img/like.svg';
import basket from './../../img/basket.svg';
import st from './Header.module.scss';
import { useCart } from '../../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className={st.headerLeft}>
          <img width={40} height={40} src={logo} alt="logo" />
          <div className={st.headerInfo}>
            <h3>React Sneakers</h3>
            <p>The shop for the best sneakers</p>
          </div>
        </div>
      </Link>

      <ul className={st.headerRight}>
        <li onClick={props.onClickCart}>
          <img width={18} height={18} src={basket} alt="Cart" /> <span>{totalPrice} $</span>
        </li>
        <li>
          <Link to="/favorites">
            <img width={18} height={18} src={like} alt="Bookmarks" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src={user} alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
