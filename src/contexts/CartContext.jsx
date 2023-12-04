import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializa el estado del carrito con el valor almacenado en localStorage
  const initialCartCount = Number(localStorage.getItem('cartCount')) || 0;
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [addedToFav, setAddedToFav] = useState({});

  const updateCartCount = useCallback((newCount) => {
    // Almacena el nuevo conteo del carrito en localStorage
    localStorage.setItem('cartCount', newCount);
    setCartCount(newCount);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, addedToFav, setAddedToFav }}>
      {children}
    </CartContext.Provider>
  );
};
