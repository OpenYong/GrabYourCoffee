import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  changed: false,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const indexOfCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const cartItem = state.items[indexOfCartItem];

    let updatedItems;

    if (cartItem) {
      const updatedItem = {
        ...cartItem,
        amount: cartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[indexOfCartItem] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      changed: true,
    };
  }
  if (action.type === "REMOVE_CART_ITEM") {
    const indexOfCartItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    const cartItem = state.items[indexOfCartItem];
    const updatedTotalAmount = state.totalAmount - cartItem.price;

    let updatedItems;
    state.changed = true;
    if (cartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...cartItem,
        amount: cartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[indexOfCartItem] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      changed: true,
    };
  }

  if (action.type === "CLEAR_CART_ITEM") {
    return defaultCartState;
  }

  if (action.type === "REPLACE_CART_ITEM") {
    return {
      items: action.items.items,
      totalAmount: action.items.totalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item, token) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item, token });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART_ITEM" });
  };

  const replaceCartHandler = (items) => {
    dispatchCartAction({ type: "REPLACE_CART_ITEM", items });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    changed: cartState.changed,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
    replaceCart: replaceCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
