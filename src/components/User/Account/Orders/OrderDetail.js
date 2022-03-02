import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  const location = useLocation();
  const shopData = location.state;

  return <div>OrderDetail</div>;
};

export default OrderDetail;
