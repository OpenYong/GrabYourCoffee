import React from "react";

import styles from "./Shop.module.css";

const Shop = (props) => {
  const shopData = props.shopData;

  const shopClickHandler = (e) => {
    e.preventDefault();

    console.log("click");
  };
  return (
    <div className={styles["shop-container"]} onClick={shopClickHandler}>
      <div className={styles.img}>이미지</div>
      <div className={styles.title}>{shopData.shopName}</div>
      <div className={styles.description}>{shopData.description}</div>
    </div>
  );
};

export default Shop;
