import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from 'react-router-dom';


const API = import.meta.env.VITE_GETCARRITO_URL;

const Carrito = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      axios.get(`${API}/${user.id}`)
        .then(response => {
          setCartItems(response.data.carrito);
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

  const handleQuantityChange = (itemSerial, event) => {
    const { value } = event.target;
    const newCartItems = cartItems.map(item => {
      if (item.serial === itemSerial) {
        return { ...item, quantity: parseInt(value) };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handlePayment = () => {
    const paymentData = {
      user: user.id,
      items: cartItems.map(item => ({
        serial: item.serial,
        quantity: item.quantity || 1
      }))
    };

    axios.post(API, paymentData)
      .then(response => {
        console.log('Pago exitoso:', response.data);
        navigate('/payment');
      })
      .catch(error => {
        console.error('Error al procesar el pago:', error);
      }, [API, cartItems,navigate, user.id]);

  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto dark:text-white mt-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Carrito de compra</h2>
        <h1>No hay elementos en el carrito.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4 dark:text-white ">Carrito de compra</h2>
      {cartItems.map(item => (
        <div key={item.serial} className="flex items-center mb-4 bg-white rounded-xl p-5 border border-azulC dark:bg-black dark:text-white">
          <img src={item.imagen} alt={item.nombre} className="w-32 h-32 mr-4 bg-white p-2" />
          <div className="flex flex-col">
            <h4 className="text-lg font-bold">{item.nombre}</h4>
            <p>{item.descripcion}</p>
            <p><b>Precio:</b> ${item.precio}</p>
            <p className='flex gap-2 items-center'>
              Cantidad:
              <input
                type="number"
                min="1"
                max={item.cantidad2}
                value={item.quantity || 1}
                onChange={event => {
                  const inputValue = parseInt(event.target.value);
                  if (inputValue > item.cantidad2) {
                    event.target.value = item.cantidad2;
                  }
                  handleQuantityChange(item.serial, event);
                }}

                className="border border-gray-400 rounded px-2 py-1 w-12 dark:text-black"
              />
            </p>
          </div>
        </div>
      ))}
      <h3 className="text-xl font-bold mb-4 dark:text-white">Total a pagar: ${total}</h3>
      <button
        onClick={handlePayment}
        className="block md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
      >
        <div className="flex rounded-md w-full h-full px-3 py-2">
          Pagar
        </div>
      </button>
    </div>
  );
};

export default Carrito;