import React from "react";

import styles from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li key={props.key} className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
      </div>
      <div className={styles.actions}>
        <span className={styles.price}>{props.price}원</span>
        <button onClick={props.onRemove}>-</button>
        <span className={styles.amount}> {props.amount}</span>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
