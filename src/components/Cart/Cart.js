import styles from "./Cart.module.css";

import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartItems = (
    <ul className={styles.item}>
      {[{ id: "c1", name: "아메리카노", amount: 3, price: 2500 }].map(
        (item) => (
          <li key={item.id}>{item.name}</li>
        )
      )}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>합계</span>
        <span>원</span>
      </div>
      <div className={styles.btn}>
        <button onClick={props.onClose}>닫기</button>
        <button className={styles.order}>주문하기</button>
      </div>
    </Modal>
  );
};

export default Cart;
