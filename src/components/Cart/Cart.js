import styles from "./Cart.module.css";

import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import { useContext } from "react/cjs/react.development";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount;

  const isCartEmpty = cartCtx.items.length <= 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles.item}>
      {cartCtx.items.map((item) => (
        <li key={item.id} className={styles["cart-item"]}>
          <div>
            <h2>{item.name}</h2>
          </div>
          <div className={styles.actions}>
            <span className={styles.price}>{item.price}원</span>
            <button onClick={cartItemRemoveHandler.bind(null, item.id)}>
              -
            </button>
            <span className={styles.amount}> {item.amount}</span>
            <button onClick={cartItemAddHandler.bind(null, item)}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>합계</span>
        <span>{totalAmount}원</span>
      </div>
      <div className={styles.btn}>
        <button onClick={props.onClose}>닫기</button>
        {!isCartEmpty && <button className={styles.order}>주문하기</button>}
      </div>
    </Modal>
  );
};

export default Cart;
