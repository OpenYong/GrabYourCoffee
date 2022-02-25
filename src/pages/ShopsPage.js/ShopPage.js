import React from "react";

import { useParams } from "react-router-dom";

import styles from "./ShopPage.module.css";

import Menu from "../../components/Menu/Menu";

import ShopDetail from "../../components/Shops/ShopDetail";

import AvailableMenu from "../../components/Menu/AvailableMenu";

const ShopPage = () => {
  const params = useParams();
  const shopId = params.shopId;

  return (
    <div>
      <ShopDetail shopId={shopId} />
      <AvailableMenu />
    </div>
  );
};

export default ShopPage;
