import React, { createContext, useReducer } from "react";
import { Product } from "../Entities/Product";

//Tutorial https://www.youtube.com/watch?v=0Z68AHS011Y

const initialState: {
  cart: Product[];
} = {
  cart: [],
};
if (localStorage.getItem("cart")) {
  const cartData = JSON.parse(localStorage.getItem("cart")!);
  initialState.cart = cartData;
  
}

const CartContext = createContext<ICartContext>({
  cart: [],
  addProduct: (product: Product) => {},
  removeProduct: () => {},
});

function cartReducer(
  state: any,
  action: { payload?: any; type: "CHANGE" | "RESET" }
) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        cart: action.payload,
      };
    case "RESET":
      return {
        ...state,
        cart: null,
      };
    default:
      return state;
  }
}

function CartProvider(props: any) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product: Product) => {
    let cartData: Product[];
    if (state.cart) {
      cartData = [...state.cart];
      cartData.push(product);
    } else cartData = [product];
    dispatch({
      type: "CHANGE",
      payload: cartData,
    });
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const removeProduct = (product: Product) => {
    let cartData : Product[] = state.cart;
    let productIndex = cartData.findIndex((p) => p.id === product.id);
    cartData.splice(productIndex, 1);
    
    dispatch({
      type: "CHANGE",
      payload: cartData,
    });
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <CartContext.Provider
      value={{ cart: state.cart, addProduct, removeProduct }}
      {...props}
    />
  );
}

export { CartContext, CartProvider };

interface ICartContext {
  cart: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}
