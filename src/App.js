import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './AppContext';

import axios from 'axios';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Favorites from './components/Favorites/Favorites';
import Orders from './pages/Orders/Orders';

//const AppContext = React.createContext({})
//console.log(AppContext)

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [clickCart, setClickCart] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  //console.log(JSON.stringify(cartItems))

  //первый запрос говорит. При первом рендере отправь запрос на получение всех моих кроссовок которые есть у меня на серваке
  //второй запрос говорит. Отправь запрос на получение корзины, получи её и сохрани в setCartItems
  //Эти два запроса друг друга не ждут -- они выполняются параллельно
  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          axios.get('https://634bff29317dc96a308f110a.mockapi.io/items'),
          axios.get('https://634bff29317dc96a308f110a.mockapi.io/cart'),
          axios.get('https://634bff29317dc96a308f110a.mockapi.io/favorites'),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Error in requesting data ;(');
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    //console.log(obj)
    //debugger
    try {
      // Метод возвращает значение первого элемента в массиве, который соответствует условию в переданной функции, или undefined.
      // c помощью find проверяем массив корзины (нет ли в корзине такого же элемента который пришёл через obj) если эл-ты равно то эл-т удаляется из корзины (действие нажатие на зелёную кнопку галочку)
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://634bff29317dc96a308f110a.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://634bff29317dc96a308f110a.mockapi.io//cart', obj);
        setCartItems((prev) =>
          prev.map((prevArr) => {
            if (prevArr.parentId === data.parentId) {
              return {
                ...prevArr,
                id: data.id,
              };
            }
            return prevArr;
          }),
        );
      }
    } catch (error) {
      console.log('Error when adding to cart');
    }
  };

  const onDeleteToCart = (id) => {
    try {
      // setCartItems([...cartItems, obj]) - эквивалентна записи ниже, просто рекомендуют писать именно так, смотри уроки по useState
      //axios.delete удалили с сервака товар
      //а втоорой строкой сразу удалили у пользлвателя из видимости
      console.log(id);
      axios.delete(`https://634bff29317dc96a308f110a.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Error when deleting from the cart');
    }
  };

  const onChangeSearchInpute = (event) => {
    setSearchValue(event.target.value);
  };

  const onClearInput = () => {
    setSearchValue('');
  };

  // const onAddToFavorites = async (obj) => {
  //   try {
  //     if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
  //       setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
  //       axios.delete(`https://62b47802530b26da4cbf4a70.mockapi.io/favorites/${obj.id}`);
  //     } else {
  //       const { data } = await axios.post('https://62b47802530b26da4cbf4a70.mockapi.io/favorites', obj)
  //       setFavorites(prev => [...prev, data]);
  //     }
  //   } catch (error) {
  //     alert('Что-то не получилось')
  //   }
  // }

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        axios.delete(`https://634bff29317dc96a308f110a.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          'https://634bff29317dc96a308f110a.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((itemCart) => Number(itemCart.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorites,
        onAddToCart,
        setClickCart,
        setCartItems,
      }}>
      <div className="wrapper">
        {/* {clickCart
          ? <Drawer
            items={cartItems}
            onCloseCart={() => setClickCart(false)}
            onDelete={onDeleteToCart} />
          : null} */}
        <Drawer
          items={cartItems}
          onCloseCart={() => setClickCart(false)}
          onDelete={onDeleteToCart}
          opened={clickCart}
        />
        <Header onClickCart={() => setClickCart(true)} />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  onChangeSearchInpute={onChangeSearchInpute}
                  onClearInput={onClearInput}
                  onAddToCart={onAddToCart}
                  onAddToFavorites={onAddToFavorites}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
