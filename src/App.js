import { Fragment, useState } from "react";
import "./App.css";

import Header from "./components/Layout/Header";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

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
        <Menu />
      </main>
    </CartProvider>
  );
}

export default App;
