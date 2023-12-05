import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from '../contexts/CartContext';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_PAYMENT_URL;
const API2 = import.meta.env.VITE_GETCARRITO_URL;
const APIUSER = import.meta.env.VITE_USER_URL;



const validationSchema = Yup.object().shape({
  nombre: Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios en blanco')
  .required('El nombre es obligatorio'),  
  apellido: Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'El apellido solo puede contener letras y espacios en blanco')
  .required('El apellido es obligatorio'),  
  cedula: Yup.string().required('La cédula es obligatoria'),
  telefono: Yup.string()
  .matches(/^[0-9]+$/, 'El teléfono solo puede contener números')
  .required('El teléfono es obligatorio'),
  direccion: Yup.string().required('La dirección es obligatoria'),
  correo: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
});



const paymentSchema = Yup.object().shape({
  numeroTarjeta: Yup.string().required('El número de tarjeta es obligatorio'),
  fechaVencimiento: Yup.string().required('La fecha de vencimiento es obligatoria'),
  cvc: Yup.string().required('El código de seguridad es obligatorio')
})

const PaymentForm = () => {
  const navigate = useNavigate();


    const { user } = useContext(AuthContext)
    const { updateCartCount } = useContext(CartContext);
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
    const [totalpagar, setTotalPagar] = useState(0);
    const [userData, setUserData] = useState("");
    

    const [paymentData, setPaymentData] = useState({
        numeroTarjeta: '',
        fechaVencimiento: '',
        cvc: ''
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${APIUSER}/${user.id}`);
          const userData = response.data;
          setUserData(userData);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      };
    
      fetchData();
    }, []);
    
    useEffect(() => {
      if (userData) {
        setClientData(prevData => ({
          ...prevData,
          nombre: userData.nombre,
          apellido: userData.apellido,
          cedula: userData.cedula,
          telefono: userData.telefono,
          correo: userData.correo
        }));
      }
    }, [userData]);


    useEffect(() => {
      axios.get(`${API2}/${user.id}`)
        .then(response => {
          const products = response.data.carrito;
          const total = response.data.preciototal
          setProducts(products);
          setTotalPagar(total);
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
    
      validationSchema.validate(clientData)
        .then(() => {
          // Los datos del cliente son válidos
          paymentSchema.validate(paymentData)
            .then(() => {
              // Los datos de pago son válidos
              const productsToSend = products.map(({ imagen, ...rest }) => rest);
              const data = {
                clientData,
                products: productsToSend,
                paymentData
              };
    
              axios.post(API, data)
                .then(response => {
                  updateCartCount(prevCount => {
                    const newCount = 0;
                    // Almacena el nuevo conteo del carrito en localStorage
                    localStorage.setItem('cartCount', newCount);
                    return newCount;
                  });
    
                  Swal.fire({
                    icon: 'success',
                    title: 'Pago realizado',
                    text: 'El pago se ha realizado correctamente',
                  });
                  navigate('/');

                })
                .catch(error => {
                  console.error(error);
    
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al realizar el pago',
                    text: 'Ha ocurrido un error al procesar el pago, por favor inténtalo de nuevo más tarde'
                  });
                });
            })
            .catch(error => {
              console.error(error);
    
              Swal.fire({
                icon: 'error',
                title: 'Datos de pago inválidos',
                text: 'Por favor verifica que los datos de pago sean correctos',
                footer: error.errors.join('\n'), // Mostrar los mensajes de error en el cuerpo de la alerta

              });
            });
        })
        .catch(error => {
          console.error(error);
    
          Swal.fire({
            icon: 'error',
            title: 'Datos del cliente inválidos',
            text: 'Por favor verifica que los datos del cliente sean correctos',
            footer: error.errors.join('\n'), // Mostrar los mensajes de error en el cuerpo de la alerta

          });
        });
    };
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 bg-white-smokeshadow dark:text-white">
    <h2 className="text-xl font-bold mb-4">Datos de Pago del Cliente</h2>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-bold mb-1">Nombre:</label>
        <input
          type="text"
          name="nombre"
          defaultValue={userData.nombre}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded text-black dark:text-black"
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Apellido:</label>
        <input
          type="text"
          name="apellido"
          defaultValue={userData.apellido}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded text-black dark:text-black"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-bold mb-1">Cedula:</label>
        <input
          type="text"
          name="cedula"
          defaultValue={userData.cedula}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded text-black dark:text-black "
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Teléfono:</label>
        <input
          type="text"
          name="telefono"
          defaultValue={userData.telefono}
          onChange={handleClientDataChange}
          className="w-full p-2 border border-gray-300 rounded text-black dark:text-black"
        />
      </div>
    </div>
    <div className="mb-4">
      <label className="block font-bold mb-1">Correo:</label>
      <input
        type="email"
        name="correo"
        defaultValue={userData.correo}
        onChange={handleClientDataChange}
        className="w-full p-2 border border-gray-300 rounded text-black dark:text-black"
      />
    </div>
    <div className="mb-4">
      <label className="block font-bold mb-1">Dirección:</label>
      <input
        type="text"
        name="direccion"
        value={clientData.direccion}
        onChange={handleClientDataChange}
        className="w-full p-2 border border-gray-300 rounded text-black dark:text-black"
      />
    </div>

      <h2 className="text-xl font-bold mb-4">Datos compra</h2>

      <div className="flex flex-wrap -mx-4">
        {products.map((product, index) => (
       <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-4 mb-4 dark:text-white ">
            <div className="rounded-lg shadow-lg p-6 h-full dark:border-azulC border-azul border-2 dark:border-4">
              <img alt={product.nombre} src={product.imagen} className="w-full h-48 object-contain mb-4 bg-white" />
              <h3 className="font-bold text-lg mb-2">{product.nombre}</h3>
              <p className="text-sm mb-2">{product.descripcion}</p>
              <p className="text-lg font-bold mb-2">Precio: {product.precio}</p>
              <p className="text-lg mb-2">Cantidad: {product.cantidad}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Total a pagar: ${totalpagar}</h2>

      <h2 className="text-xl font-bold mb-4">Datos de pago</h2>
      <div className="bg-gradient-to-br from-blue-900 to-blue-500 rounded-xl p-6 mb-4">
        <div className="mb-4">
            <label className="block font-bold mb-1 text-white">Número de tarjeta:</label>
            <input
            type="number"
            name="numeroTarjeta"
            value={paymentData.numeroTarjeta}
            onChange={handlePaymentDataChange}
            className="w-full p-2 bg-white-smoke rounded text-black dark:text-black "
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
                className="w-full p-2 bg-white-smoke rounded text-black dark:text-black"
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
                className="w-full p-2 bg-white-smoke rounded text-black dark:text-black"
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