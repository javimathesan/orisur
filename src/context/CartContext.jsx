/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    // 1. Buscamos el producto en el cart actual del closure (no dentro del updater)
    const existingItem = cart.find((product) => product.id === item.id);
    const cantidadActual = existingItem ? existingItem.quantity : 0;

    // 2. Calculamos cuánto stock real queda libre
    const disponible = item.stock - cantidadActual;
    const cantidadAgregada = Math.max(0, Math.min(quantity, disponible));

    // 3. Si hay algo para agregar, actualizamos el estado de forma inmutable
    if (cantidadAgregada > 0) {
      setCart((prev) => {
        const yaExiste = prev.some((product) => product.id === item.id);

        if (yaExiste) {
          return prev.map((product) =>
            product.id === item.id
              ? { ...product, quantity: product.quantity + cantidadAgregada }
              : product
          );
        }
        return [...prev, { ...item, quantity: cantidadAgregada }];
      });
    }

    // 4. Retornamos la cantidad realmente agregada, ya calculada de forma determinista
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

  // Devuelve la cantidad actual en el carrito de un producto puntual (0 si no está)
  const getItemQuantity = (id) => {
    const existingItem = cart.find((product) => product.id === id);
    return existingItem ? existingItem.quantity : 0;
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
        getItemQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
