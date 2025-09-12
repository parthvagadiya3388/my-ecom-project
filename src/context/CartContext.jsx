import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exist = state.items.find((i) => i.id === action.payload.id);
      if (exist) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id, quantity) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((s, it) => s + it.quantity, 0);
  const totalPrice = state.items.reduce(
    (s, it) => s + it.quantity * it.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
