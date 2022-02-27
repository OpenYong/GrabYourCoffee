import React from "react";
import { Link } from "react-router-dom";

import ShopManagement from "./ShopManagement";

import styles from "./AccountItem.module.css";

const AccountItem = (props) => {
  const shopData = props.shopData;

  return (
    <div className={styles["item-container"]}>
      <div className={styles.header}>
        <div>
          <h3>id</h3>
        </div>
        <div className={styles["button-container"]}>
          <div className={styles.btn}>
            <Link to={`details/${shopData.id}`} state={shopData}>
              상세 보기
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.overview}>
        <div className={styles["image-container"]}>
          <img src={shopData.imageUrl}></img>
        </div>
        <div className={styles["shop-info"]}>
          <div>
            <h3>{shopData.shopName}</h3>
          </div>
          <div>
            <p>{shopData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountItem;
