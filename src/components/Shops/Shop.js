import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Shop.module.css";

const Shop = (props) => {
  const shopData = props.shopData;

  const navigate = useNavigate();

  const shopClickHandler = (e) => {
    navigate(`/shops/${shopData.id}`);
  };
  return (
    <div className={styles["shop-container"]} onClick={shopClickHandler}>
      <div className={styles.img}>
        <img src={shopData.imageUrl} />
      </div>
      <div className={styles.title}>{shopData.shopName}</div>
      <div className={styles.description}>{shopData.description}</div>
    </div>
  );
};

export default Shop;
