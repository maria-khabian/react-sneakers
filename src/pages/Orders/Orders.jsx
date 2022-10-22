import React from 'react';
import axios from 'axios';
//import AppContext from '../../AppContext';

import st from './Orders.module.scss';
import btnBack from '../../img/btn-back.svg';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

function Orders() {
  const [isLoading, setIsLoading] = React.useState(true);

  //const { favorites, onAddToFavorites } = React.useContext(AppContext);
  //debugger

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://634bff29317dc96a308f110a.mockapi.io/orders');
        //console.log(data.map(obj => obj.items).flat());
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Error when requesting orders');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={st.headerFavorites}>
      <div className={st.headerTitle}>
        <Link to="/">
          <img className={st.back} src={btnBack} alt="Back" />
        </Link>
        <h1>My orders</h1>
      </div>
      {/* sneakersCard cтили взяла из index.scss навесив нужный класс*/}
      <div className={st.favoritesCard}>
        {isLoading
          ? Array(8).fill(<Card loading={isLoading} />)
          : orders.map((item, index) => <Card key={index} loading={isLoading} {...item} />)}
      </div>
    </div>
  );
}

export default Orders;
