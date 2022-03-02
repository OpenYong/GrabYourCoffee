import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Orders from "../../../components/User/Account/Orders/Orders";
import OrderDetail from "../../../components/User/Account/Orders/OrderDetail";

import AuthContext from "../../../store/auth-context";

const OrdersPage = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<Orders token={token} />} />
        <Route path="details/:shopId" element={<OrderDetail />} />
      </Routes>
    </React.Fragment>
  );
};

export default OrdersPage;
