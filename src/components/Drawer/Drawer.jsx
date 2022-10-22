import React from 'react';
import axios from 'axios';

import close from './../../img/close.svg';
import arrow from './../../img/arrow.svg';
import emptyCart from './../../img/emptyCart.png';
import completeOrder from './../../img/completeOrder.jpg';
import st from './Drawer.module.scss';
import Info from '../Info/Info';
import { useCart } from '../../hooks/useCart';
//import AppContext from '../../AppContext';

//в пропсах мы сделали деструктуризацию, чтобы каждый пропс передать по отдельности и была возможность сделать значение по уполчанию где это необходимо;
//item = [] в этом случ мы сделали знач по умолч. чтобы в случае если массива нет, чтобы вёрстка неломалась а просто отображалась пустая корзина

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ items = [], onCloseCart, onDelete, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();

  const [orderId, setOrderId] = React.useState(null);
  const [isOrderCompeted, setIsOrderCompeted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://634bff29317dc96a308f110a.mockapi.io/orders', {
        items: cartItems,
      });
      // await axios.put('https://62b47802530b26da4cbf4a70.mockapi.io/cart', []);
      setOrderId(data.id);
      setIsOrderCompeted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://634bff29317dc96a308f110a.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${st.overlay} ${opened ? st.overlayVisible : ''}`}>
      <div className={st.drawer}>
        <h2>
          Cart
          <img onClick={onCloseCart} width={32} height={32} src={close} alt="close" />
        </h2>

        {items.length > 0 ? (
          <>
            <ul className={st.inCartList}>
              {/* мапим массив который пришёл к нам из пропсов, если в массиве есть объекты, значит корзина заполнится, если нету - будет отображена пустая корзина, потому что мапу просто не почем проходиться  */}

              {items.map((obj, index) => (
                <li className={st.inCartItem} key={index}>
                  <img width={70} height={70} src={obj.imgUrl} alt={obj.alt} />
                  <div className={st.cartInfo}>
                    <p>{obj.title}</p>
                    <span>{obj.price} $</span>
                  </div>
                  <button onClick={() => onDelete(obj.id)} className={st.removeBtn}>
                    <img width={32} height={32} src={close} alt="close" />
                  </button>
                </li>
              ))}
            </ul>
            <ul className={st.commonPriseList}>
              <li>
                <span>Total:</span>
                <div></div>
                <b>{totalPrice} $ </b>
              </li>
              <li>
                <span>Tax 5%:</span>
                <div></div>
                <b>{((totalPrice / 100) * 5).toFixed(2)} $ </b>
              </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className={st.greenBtn}>
              Place an order
              <img width={14} height={12} src={arrow} alt="arrow" />
            </button>
          </>
        ) : (
          <Info
            title={isOrderCompeted ? 'Order placed!' : 'Cart is empty'}
            description={
              isOrderCompeted
                ? `Your order #${orderId} will soon be handed over to courier delivery.`
                : 'Add at least one pair of trainers to place your order.'
            }
            image={isOrderCompeted ? completeOrder : emptyCart}
            src={arrow}
          />
        )}

        {/* <ul className={st.commonPriseList}>
          <li>
            <span>Итого:</span>
            <div></div>
            <b>21 498 $ </b>
          </li>
          <li>
            <span>Налог 5%:</span>
            <div></div>
            <b>1074 $ </b>
          </li>
        </ul>
        <button className={st.greenBtn}>
          Оформить заказ
          <img width={14} height={12} src={arrow} alt='arrow' />
        </button> */}
      </div>
    </div>
  );
}

export default Drawer;
