import React, { useState, useContext, useEffect } from "react";
import styles from "./Shops.module.css";

import Modal from "../../UI/Modal";
import AuthContext from "../../../store/auth-context";
import AccountItem from "./AccountItem";
import Card from "../../UI/Card";
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

  const shopLists = shopData.map((shop) => (
    <AccountItem key={shop.id} shopData={shop} />
  ));

  return (
    <div className={styles["shops-container"]}>
      <div className={styles["shops-header"]}>
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
