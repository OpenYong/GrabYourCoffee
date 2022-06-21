import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../../../store/auth-context";

import Button from "../../../UI/Button";
import AccountHeader from "../AccountHeader";

import styles from "./Shops.module.css";

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

  let shopLists;

  shopLists = (
    <ul className={styles.ul}>
      {shopData.map((shop) => (
        <li key={shop.id}>
          <div className={styles["item-container"]}>
            <div className={styles.header}>
              <div>
                <h3>#{shop.id}</h3>
              </div>
              <div className={styles["button-container"]}>
                <Button>
                  <Link to={`details/${shop.id}`} state={shop}>
                    상세 보기
                  </Link>
                </Button>
              </div>
            </div>
            <div className={styles.overview}>
              <div className={styles["image-container"]}>
                <img src={shop.imageUrl}></img>
              </div>
              <div className={styles["shop-info"]}>
                <div>
                  <h4>{shop.shopName}</h4>
                  <span>{shop.description}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  if (shopData.length === 0) {
    shopLists = (
      <>
        <p>등록된 카페가 없습니다.</p>
      </>
    );
  }

  return (
    <div className={styles["article-container"]}>
      <div className={styles["article-header"]}>
        <AccountHeader headerText="카페 관리">
          <Button>
            <Link to="register">등록</Link>
          </Button>
        </AccountHeader>
      </div>
      {shopLists}
    </div>
  );
};

export default Shops;
