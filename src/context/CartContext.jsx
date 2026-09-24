/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
} from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        return prev.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity:
                  product.quantity + quantity,
              }
            : product
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setCart((prev) =>
      prev.filter(
        (product) => product.id !== id
      )
    );
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some(
      (product) => product.id === id
    );
  };

  const totalItems = cart.reduce(
    (acc, product) =>
      acc + product.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc, product) =>
      acc +
      product.price * product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}