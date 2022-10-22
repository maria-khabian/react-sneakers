import React from 'react';
import AppContext from '../../AppContext';
import st from './Info.module.scss';

const Info = ({ title, image, description, src }) => {
  //debugger
  const { setClickCart } = React.useContext(AppContext);

  return (
    <div className={st.emptyCart}>
      <img width={120} src={image} alt="emptyCart" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => setClickCart(false)} className={st.greenBtn}>
        Go back
        <img className={st.invert} width={14} height={12} src={src} alt="arrow" />
      </button>
    </div>
  );
};
export default Info;
