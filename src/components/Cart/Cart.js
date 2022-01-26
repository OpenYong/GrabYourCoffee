import React, { useContext, useState } from "react";

import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  console.log(`테스트 : ${didSubmit}`);

  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount;

  const isCartEmpty = cartCtx.items.length <= 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedMenuItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles.item}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>합계</span>
        <span>{totalAmount}원</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && (
        <div className={styles.btn}>
          <button onClick={props.onClose}>닫기</button>
          {!isCartEmpty && (
            <button className={styles.order} onClick={orderHandler}>
              주문하기
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!didSubmit && modalContent}
      {didSubmit && <span>주문이 완료되었습니다.</span>}
    </Modal>
  );
};

export default Cart;
