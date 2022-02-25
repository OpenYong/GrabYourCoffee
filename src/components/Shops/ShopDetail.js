import React, { useEffect, useState } from "react";

import styles from "./ShopDetail.module.css";

const ShopDetail = (props) => {
  const shopId = props.shopId;
  const [shopData, setShopData] = useState();

  useEffect(() => {
    const fetchShopLists = async (shopId) => {
      const response = await fetch(`http://localhost:8080/shop/list/${shopId}`);

      if (response.status === 404) {
        throw new Error("찾을 수 없는 데이터");
      }

      const responseData = await response.json();

      setShopData(responseData.shop);
    };
    fetchShopLists(shopId).catch((error) => {
      console.log(error);
    });
  }, []);

  console.log(shopData);

  return (
    <div className={styles["detail-container"]}>
      <div className={styles.title}>
        <h2>{shopData.shopName}</h2>
      </div>
      <div>카페 위치</div>
      <div className={styles.img}>
        <img src="" />
      </div>
      <div>
        <h3>소개</h3>
        <div className={styles.description}>{shopData.description}</div>
      </div>
    </div>
  );
};

export default ShopDetail;
