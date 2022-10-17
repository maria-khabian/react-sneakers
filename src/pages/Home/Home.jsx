import React from 'react';
// import AppContext from '../../AppContext';

import Card from "../../components/Card/Card";
import close from './../../img/close.svg';
import search from './../../img/search.svg';

function Home({
    items,
    searchValue,
    onChangeSearchInpute,
    onClearInput,
    onAddToCart,
    onAddToFavorites,
    isLoading }) {

        
    const renderItems = () => {
        const filtredItems = items.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        //debugger
        return (
            isLoading ? Array(8).fill(<Card loading={isLoading} />) : filtredItems
                .map((item, index) => (
                    <Card
                        key={index}
                        onFavorite={(obj) => onAddToFavorites(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        loading={isLoading}
                        { ...item } />
                ))
        )
    }

    return (
        <>
            <div className='mainHeader'>

                <h1>{searchValue ? `Идёт поиск: ${searchValue}` : 'Все кроссовки'}</h1>
                <div className='searchBlock'>
                    <img width={14.25} height={14.25} src={search} alt='search' />
                    <input onChange={onChangeSearchInpute} value={searchValue} placeholder='Поиск...' />
                    {searchValue
                        ? <img onClick={onClearInput} className='close' width={21} height={21} src={close} alt='close' />
                        : null}
                </div>
            </div>

            <div className='sneakersCard'>
                {renderItems()}
            </div>
        </>
    )
}

export default Home;