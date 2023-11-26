import React, { useContext, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider"; 
import axios from "axios";

const API = import.meta.env.VITE_USERS_URL

const CartButton = () => {

  const [selectedProductsCount, setSelectedProductsCount] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartProductsCount = async () => {
      try {
        const response = await axios.get(`${API}/${user.id}`);
        const Cart = response.data.carrito;
        const cartProductsCount = Cart.length

        setSelectedProductsCount(cartProductsCount);
      } catch (error) {
        console.log(error);
      }
    };

    if (user.id) {
      fetchCartProductsCount();
    }
  }, [user.id]);

  useContext(AuthContext)
  return (
    <Link
      to="/carrito"
      className="fixed bottom-8 bg-azul text-white right-8 rounded-full p-3 shadow-lg z-10 p-7 hover:bg-azulC hover:shadow-xl transition-all duration-500 ease-in-out"
    >
      <FaShoppingCart className="text-4xl relative" />
      {selectedProductsCount >= 0 && (
        <span className="absolute top-2 right-3 bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {selectedProductsCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;