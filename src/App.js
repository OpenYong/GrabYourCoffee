import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { AuthProvider } from "./store/auth-context";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage/UserPage";
import ShopPage from "./pages/ShopsPage.js/ShopPage";

function App() {
  const [cartIsShow, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <AuthProvider>
      <CartProvider>
        {cartIsShow && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user/*" element={<UserPage />} />
            <Route path="/shops/:shopId" element={<ShopPage />} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
