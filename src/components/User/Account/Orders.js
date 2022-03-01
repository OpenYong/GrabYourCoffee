import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Shops.module.css";

import useHttp from "../../../hooks/use-http";

const Orders = (props) => {
  const { sendRequest, error, isLoading } = useHttp();

  const [orderData, setOrderData] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const token = props.token;

  useEffect(() => {
    const setDataFunc = (objData) => {
      console.log(objData.orders);

      let orderData = [];
      let orderedItemsData = [];

      for (const key in objData.orders) {
        let date = new Date(objData.orders[key].createdAt);
        date =
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();

        orderData.push({
          id: objData.orders[key]._id,
          tel: objData.orders[key].tel,
          items: objData.orders[key].orderedItems,
          totalAmount: objData.orders[key].totalAmount,
          shopId: objData.orders[key].shop,
          status: objData.orders[key].status,
          date: date,
          shopName: objData.orders[key].shopName,
          imageUrl: `http://localhost:8080/${objData.orders[key].imageUrl}`,
        });
      }

      setOrderData(orderData);
      setOrderedItems(orderedItemsData);
    };

    sendRequest(
      {
        url: "http://localhost:8080/user/order",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      setDataFunc
    );
  }, []);

  const orderLists = (
    <ul>
      {orderData.map((order) => (
        <li key={order.id}>
          <div className={styles["item-container"]}>
            <div className={styles.header}>
              <div>
                <h3>{order.id}</h3>
              </div>
              <div className={styles["button-container"]}>
                <div className={styles.btn}>
                  <Link to={`details/${order.id}`} state={order}>
                    상세 보기
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.overview}>
              <div className={styles["image-container"]}>
                <img src={order.imageUrl}></img>
              </div>
              <div className={styles["shop-info"]}>
                <div>
                  <h4>주문 가게</h4>
                  <p>{order.shopName}</p>
                </div>
                <div>
                  <h4>주문 일자</h4>
                  <p>{order.date}</p>
                </div>
                <div>
                  <h4>주문 금액</h4>
                  <p>{order.totalAmount}원</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles["article-container"]}>
      <div className={styles["article-header"]}>
        <h1>주문 내역</h1>
        <div className={styles.btn}>{/* <Link to="/">등록</Link> */}</div>
      </div>
      {orderLists}
    </div>
  );
};

export default Orders;
