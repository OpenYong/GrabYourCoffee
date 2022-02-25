import React from "react";

import AvailableShops from "./AvailableShops";

import styles from "./Shops.module.css";

const Shops = () => {
  return (
    <div className={styles["shops-container"]}>
      <div className={styles.header}>
        <h2>인기 있는 카페</h2>
      </div>
      <AvailableShops />
    </div>
  );
};

export default Shops;
