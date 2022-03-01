import React, { useState, useContext, useEffect } from "react";
import styles from "./Shops.module.css";

import AuthContext from "../../../store/auth-context";
import { Link } from "react-router-dom";

const Shops = () => {
  const [shopData, setShopData] = useState([]);
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  useEffect(() => {
    const fetchShopLists = async () => {
      const response = await fetch(`http://localhost:8080/shop/myshops`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        throw new Error("찾을 수 없는 데이터");
      }

      const responseData = await response.json();

      let shopsData = [];

      for (const key in responseData.shops) {
        shopsData.push({
          id: responseData.shops[key]._id,
          shopName: responseData.shops[key].shopName,
          description: responseData.shops[key].description,
          hasParkingLot: responseData.shops[key].hasParkingLot,
          hasTables: responseData.shops[key].hasTables,
          imageUrl: `http://localhost:8080/${responseData.shops[key].imageUrl}`,
        });
      }

      setShopData(shopsData);
    };

    fetchShopLists().catch((error) => {
      console.log(error);
    });
  }, []);

  console.log(shopData);

  const shopLists = (
    <ul>
      {shopData.map((shop) => (
        <li key={shop.id}>
          <div className={styles["item-container"]}>
            <div className={styles.header}>
              <div>
                <h3>id</h3>
              </div>
              <div className={styles["button-container"]}>
                <div className={styles.btn}>
                  <Link to={`details/${shop.id}`} state={shop}>
                    상세 보기
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.overview}>
              <div className={styles["image-container"]}>
                <img src={shop.imageUrl}></img>
              </div>
              <div className={styles["shop-info"]}>
                <div>
                  <h3>{shop.shopName}</h3>
                </div>
                <div>
                  <p>{shop.description}</p>
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
        <h1>카페 관리</h1>
        <div className={styles.btn}>
          <Link to="register">등록</Link>
        </div>
      </div>
      {shopLists}
    </div>
  );
};

export default Shops;
