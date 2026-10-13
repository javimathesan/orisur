/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    // Variable externa para poder devolver la cantidad realmente agregada
    let cantidadAgregada = 0;

    setCart((prev) => {
      // 1. Buscamos el producto en el carrito actual (siempre con prev, nunca con cart)
      const existingItem = prev.find((product) => product.id === item.id);
      const cantidadActual = existingItem ? existingItem.quantity : 0;

      // 2. Calculamos de forma limpia cuánto stock real queda libre
      const disponible = item.stock - cantidadActual;
      cantidadAgregada = Math.max(0, Math.min(quantity, disponible));

      // 3. Si no hay espacio para agregar nada, no tocamos el estado
      if (cantidadAgregada === 0) {
        return prev;
      }

      // 4. Actualizamos el estado con la cantidad ya validada de manera inmutable
      if (existingItem) {
        return prev.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + cantidadAgregada }
            : product
        );
      }
      return [...prev, { ...item, quantity: cantidadAgregada }];
    });

    // 5. Retornamos con total precisión la cantidad añadida
    return cantidadAgregada;
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((product) => product.id === id);
  };

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

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
