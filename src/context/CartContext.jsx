import { createContext, useContext, useState } from 'react';

// Contexto del carrito: se exporta por si algún componente
// prefiere consumirlo directamente con useContext
export const CartContext = createContext();

// Custom hook para simplificar el consumo del contexto
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agrega un producto; si ya existe (mismo id), suma la cantidad
  // en vez de duplicar la entrada (update inmutable con .map())
  const addItem = (item, quantity) => {
    setCart((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);

      if (existingItem) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  // Elimina un producto del carrito por su id (filter, inmutable)
  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Vacía el carrito por completo
  const clear = () => {
    setCart([]);
  };

  // Indica si un producto ya está en el carrito
  const isInCart = (id) => cart.some((p) => p.id === id);

  // Cantidad total de ítems (suma de quantity, no cantidad de líneas)
  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);

  // Precio total del carrito, útil para la vista Cart
  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

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
