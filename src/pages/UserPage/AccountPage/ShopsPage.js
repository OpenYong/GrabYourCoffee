import React from "react";
import { Routes, Route } from "react-router-dom";

import Shops from "../../../components/User/Account/Shops/Shops";
import ShopRegister from "../../../components/User/Account/Shops/ShopRegister";
import ShopManagement from "../../../components/User/Account/Shops/ShopManagement";

const ShopsPage = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<Shops />} />
        <Route path="register" element={<ShopRegister />} />
        <Route path="details/:shopId" element={<ShopManagement />} />
      </Routes>
    </React.Fragment>
  );
};

export default ShopsPage;
