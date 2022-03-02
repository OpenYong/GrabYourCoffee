import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";

import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import CartItem from "./CartItem";
import Button from "../UI/Button";

import styles from "./Cart.module.css";

import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  console.log(`테스트 : ${didSubmit}`);

  const { sendRequest, error, isLoading } = useHttp();

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const token = authCtx.token;
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
    // console.log(cartCtx);
    const requestFunc = (dataObj) => {
      console.log(dataObj);
    };

    sendRequest(
      {
        url: `http://localhost:8080/user/order/${cartCtx.shopId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tel: userData.tel,
          orderedItems: cartCtx.items,
          totalAmount: cartCtx.totalAmount,
          request: userData.request ? userData.request : "요청사항 없음",
        }),
      },
      requestFunc
    ).then(() => {
      cartCtx.clearCart();
    });

    setDidSubmit(true);
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
      <div className={styles.header}>
        <h1>카트</h1>
      </div>
      {cartItems}
      <div className={styles.total}>
        <h1>합계</h1>
        <span>{totalAmount}원</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && (
        <div className={styles["btn-container"]}>
          <Button className="cancel">
            <button onClick={props.onClose}>닫기</button>
          </Button>
          {!isCartEmpty && (
            <Button>
              <button className={styles.order} onClick={orderHandler}>
                주문하기
              </button>
            </Button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!didSubmit && modalContent}
      {isLoading && <span>주문을 요청중입니다.</span>}
      {didSubmit && <span>주문이 완료되었습니다.</span>}
    </Modal>
  );
};

export default Cart;
