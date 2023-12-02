import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import { CartContext } from '../contexts/CartContext';
const API = import.meta.env.VITE_USERS_URL;

export const fetchCartProductsCount = async (userId, setSelectedProductsCount) => {
  try {
    const response = await axios.get(`${API}/${userId}`);
    const Cart = response.data.carrito;
    const cartProductsCount = Cart.length;

    setSelectedProductsCount(cartProductsCount);
  } catch (error) {
    console.log(error);
  }
};

const CartButton = () => {
  const { user, loggedIn } = useContext(AuthContext);
  const { cartCount, updateCartCount } = useContext(CartContext);

  // Inicializa el estado del carrito con el valor almacenado en localStorage para el usuario actual
  useEffect(() => {
    if (user.id) {
      const initialCartCount = Number(localStorage.getItem(`cartCount-${user.id}`)) || 0;
      updateCartCount(initialCartCount);
      fetchCartProductsCount(user.id, updateCartCount);
    }
  }, [user.id]);

  return (
    <>
       {loggedIn && (
        <Link
          to="/carrito"
          className="fixed bottom-8 bg-azul text-white right-8 rounded-full p-3 shadow-lg z-10 hover:bg-azulC hover:shadow-xl transition-all duration-500 ease-in-out"
        >
          <FaShoppingCart className="text-3xl relative" />
          {cartCount >= 0 && (
            <span className="absolute -top-1 -right-1 bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {cartCount}
            </span>
          )}
        </Link>
      )}
    </>
  );
};

export default CartButton;
