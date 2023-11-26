import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthProvider";

const API = import.meta.env.VITE_PAYMENT_URL;

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

    const [productData, setProductData] = useState({
        nombreProducto: '',
        cantidad: '',
        precio: ''
    });

    const [paymentData, setPaymentData] = useState({
        numeroTarjeta: '',
        fechaVencimiento: '',
        cvc: ''
    });

    const handleClientDataChange = e => {
        const { name, value } = e.target;
        setClientData(prevData => ({
        ...prevData,
        [name]: value
        }));
    };

    const handlePurchaseDataChange = e => {
        const { name, value } = e.target;
        setProductData(prevData => ({
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

        const data = {
        clientData,
        productData,
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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white-smokeshadow">
      <h2 className="text-xl font-bold mb-4">Datos cliente</h2>
      <div className="mb-4">
        <label className="block font-bold mb-1">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={clientData.nombre}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={clientData.apellido}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Cedula:</label>
        <input
          type="text"
          name="cedula"
          value={clientData.cedula}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
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
        <label className="block font-bold mb-1">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          value={clientData.telefono}
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
      <div className="mb-4">
        <label className="block font-bold mb-1">Nombre producto:</label>
        <input
          type="text"
          name="nombreProducto"
          value={productData.nombreProducto}
          onChange={handlePurchaseDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={productData.cantidad}
          onChange={handlePurchaseDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Precio:</label>
        <input
          type="number"
          name="precio"
          value={productData.precio}
          onChange={handlePurchaseDataChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
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