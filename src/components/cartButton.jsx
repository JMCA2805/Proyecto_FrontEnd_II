import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = () => {
  return (
    <Link to="/carrito"
      className="fixed bottom-4 text-azul right-4 bg-white rounded-full p-3 shadow-lg z-10 p-7 hover:bg-azul hover:text-white transition-all duration-500 ease-in-out"
    >
      <FaShoppingCart className="text-4xl" />
    </Link>
  );
};

export default CartButton;