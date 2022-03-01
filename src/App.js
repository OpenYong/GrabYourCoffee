import React, { useContext, useEffect, useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";

import CartProvider from "./store/CartProvider";
import { AuthProvider } from "./store/auth-context";
import CartContext from "./store/cart-context";
import AuthContext from "./store/auth-context";

import useHttp from "./hooks/use-http";

import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage/UserPage";
import ShopPage from "./pages/ShopsPage.js/ShopPage";

let isFirstLoading = true;

function App() {
  const [cartIsShow, setCartIsShown] = useState(false);

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  const { sendRequest, error, isLoading } = useHttp();

  useEffect(async () => {
    console.log("11111");

    if (token) {
      try {
        const setDataFunc = (objData) => {
          console.log(objData.cart);
          cartCtx.replaceCart(objData.cart);
        };

        sendRequest(
          {
            url: `http://localhost:8080/user/cart`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          setDataFunc
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (isFirstLoading) {
      isFirstLoading = false;
      return;
    }
    if (cartCtx.changed) {
      const setDataFunc = (objData) => {
        console.log(objData);
      };
      sendRequest(
        {
          url: "http://localhost:8080/user/cart",
          method: "PUT",
          body: JSON.stringify({
            items: cartCtx.items,
            totalAmount: +cartCtx.totalAmount,
            shopId: cartCtx.shopId,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        setDataFunc
      );
    }
  }, [cartCtx]);

  console.log("isLoading :  " + isLoading);

  const showCartHandler = () => {
    console.log(cartCtx);
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <React.Fragment>
      {cartIsShow && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/shops/:shopId" element={<ShopPage />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
