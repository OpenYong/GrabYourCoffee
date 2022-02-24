import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";

function App() {
  const [cartIsShow, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShow && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/*" element={<UserPage />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
