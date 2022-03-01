import React from "react";

const CartContext = React.createContext({
  items: [],
  shopId: "",
  totalAmount: 0,
  changed: false,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  replaceCart: (item) => {},
});

export default CartContext;
