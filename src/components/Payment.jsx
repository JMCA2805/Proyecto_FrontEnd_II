import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthProvider";

const API = import.meta.env.VITE_PAYMENT_URL;
const API2 = import.meta.env.VITE_GETCARRITO_URL;

const PaymentForm = () => {

    const { user } = useContext(AuthContext)

    const [clientData, setClientData] = useState({
        id: user.id,
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        direccion: '',
        correo: ''
    });

    const [products, setProducts] = useState([]);

    const [paymentData, setPaymentData] = useState({
        numeroTarjeta: '',
        fechaVencimiento: '',
        cvc: ''
    });

    useEffect(() => {


      axios.get(`${API2}/${user.id}`)
        .then(response => {
          const products = response.data;
          setProducts(products);
        })
        .catch(error => {
          console.error('Error al obtener los productos del carrito:', error);
        });
    }, [API, user.id]);

    const handleClientDataChange = e => {
        const { name, value } = e.target;
        setClientData(prevData => ({
        ...prevData,
        [name]: value
        }));
    };

    const handlePaymentDataChange = e => {
        const { name, value } = e.target;
        setPaymentData(prevData => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(products)

        const productsToSend = products.map(({ imagen, ...rest }) => rest);
        const data = {
        clientData,
        products: productsToSend,
        paymentData
        };

        axios.post(API, data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white-smokeshadow dark:text-white">
    <h2 className="text-xl font-bold mb-4">Datos cliente</h2>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-bold mb-1">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={clientData.nombre}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={clientData.apellido}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-bold mb-1">Cedula:</label>
        <input
          type="text"
          name="cedula"
          value={clientData.cedula}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          value={clientData.telefono}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-bold mb-1">Correo:</label>
      <input
        type="email"
        name="correo"
        value={clientData.correo}
        onChange={handleClientDataChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block font-bold mb-1">Dirección:</label>
      <input
        type="text"
        name="direccion"
        value={clientData.direccion}
        onChange={handleClientDataChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

      <h2 className="text-xl font-bold mb-4">Datos compra</h2>

      <div className="flex flex-wrap -mx-4">
        {products.map((product, index) => (
       <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-4 mb-4 dark:text-black">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img alt={product.nombre} src={product.imagen} className="w-full h-48 object-contain mb-4" />
              <h3 className="font-bold text-lg mb-2">{product.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.descripcion}</p>
              <p className="text-lg font-bold mb-2">Precio: {product.precio}</p>
              <p className="text-lg mb-2">Cantidad: {product.cantidad}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Datos de pago</h2>
      <div className="bg-gradient-to-br from-blue-900 to-blue-500 rounded-xl p-6 mb-4">
        <div className="mb-4">
            <label className="block font-bold mb-1 text-white">Número de tarjeta:</label>
            <input
            type="number"
            name="numeroTarjeta"
            value={paymentData.numeroTarjeta}
            onChange={handlePaymentDataChange}
            className="w-full p-2 bg-white-smoke rounded"
            placeholder="1234 5678 9012 3456"
            />
        </div>
        <div className="flex mb-4">
            <div className="w-1/2 mr-2">
            <label className="block font-bold mb-1 text-white">Fecha de vencimiento:</label>
            <input
                type="text"
                name="fechaVencimiento"
                value={paymentData.fechaVencimiento}
                onChange={handlePaymentDataChange}
                className="w-full p-2 bg-white-smoke rounded"
                placeholder="MM/AA"
            />
            </div>
            <div className="w-1/2 ml-2">
            <label className="block font-bold mb-1 text-white">CVC:</label>
            <input
                type="number"
                name="cvc"
                value={paymentData.cvc}
                onChange={handlePaymentDataChange}
                className="w-full p-2 bg-white-smoke rounded"
                placeholder="CVC"
            />
            </div>
        </div>
        </div>

      <button
        type="submit"
        className="bg-azulC text-white px-4 py-2 rounded font-bold hover:bg-azul"
      >
        Pagar
      </button>
    </form>
  );
};

export default PaymentForm;