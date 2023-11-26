import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_GETCARRITO_URL;

const Carrito = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    if (user.id){
        axios.get(`${API}/${user.id}`)
        .then(response => {
          setCartItems(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los productos del carrito:', error);
        });
    }

  }, [user.id]);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cartItems.reduce((acc, item) => acc + (item.precio * (item.quantity || 1)), 0);
      setTotal(newTotal);
    };

    if (cartItems.length > 0) {
      calculateTotal();
    }
  }, [cartItems]);

  const handleQuantityChange = (itemId, event) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: parseInt(event.target.value) };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Carrito de compra</h2>
      {cartItems.map(item => (
        <div key={item.id} className="mb-4">
          <h4 className="text-lg font-bold">{item.nombre}</h4>
          <p>{item.descripcion}</p>
          <p>Precio: ${item.precio}</p>
          <input
            type="number"
            min="1"
            value={item.quantity || 1}
            onChange={event => handleQuantityChange(item.id, event)}
            className="border border-gray-400 rounded px-2 py-1 mt-2"
          />
        </div>
      ))}
      <h3 className="text-xl font-bold mb-4">Total a pagar: ${total}</h3>
      <Link to="/payment" className="bg-blue-500 text-white py-2 px-4 rounded">
        Pagar
      </Link>
    </div>
  );
};

export default Carrito;