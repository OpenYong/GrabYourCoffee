import React from "react";

import { useParams } from "react-router-dom";

import styles from "./ShopPage.module.css";

import Menu from "../../components/Menu/Menu";

import ShopDetail from "../../components/Shops/ShopDetail";

const ShopPage = () => {
  const params = useParams();
  const shopId = params.shopId;

  return (
    <div className={styles.main}>
      <ShopDetail shopId={shopId} />
      <Menu shopId={shopId} />
    </div>
  );
};

export default ShopPage;
