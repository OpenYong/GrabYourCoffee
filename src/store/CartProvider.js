import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
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
    };
  } else if (action.type === "REMOVE_CART_ITEM") {
    const indexOfCartItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    const cartItem = state.items[indexOfCartItem];
    const updatedTotalAmount = state.totalAmount - cartItem.price;

    let updatedItems;
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
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
