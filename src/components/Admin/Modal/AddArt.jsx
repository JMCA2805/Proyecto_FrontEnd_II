import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { Modal } from "flowbite-react";

import * as Yup from 'yup';


//Api de servidor backend
const API = import.meta.env.VITE_ADDART_URL;

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required('El título es requerido'),
  texto: Yup.string().required('El texto del artículo es requerido'),
  imagen: Yup.mixed().required('La imagen es requerida'),
});

function AddArt({ openModal, handleModalSet, handleUp }) {
  // Inicializacion de estados
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagen, setImagen] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const navigate = useNavigate();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('texto', texto);
    formData.append('imagen', imagen);

    // Verificar que los campos obligatorios no estén vacíos
    if (!imagen) {
      console.log("Por favor, ingresa la imagen del articulo.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa la imagen del articulo.",
      }).then({});
      return;
    }

    const articulo = {
      titulo,
      texto,
    };

    try {
      await validationSchema.validate({ titulo, texto, imagen }, { abortEarly: false });

      const response = await axios.post(`${API}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setRespuesta(response.data);
      setMostrarMensaje(true);

      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);

      setTitulo("");
      setTexto("");
      setImagen("");
      handleModalSet();
      handleUp();

      
      
      // Mostrar mensaje de confirmación con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha registrado exitosamente.',
      })
      navigate("/Blog");


    } catch (error) {
      console.error(error);
      setRespuesta('Ocurrió un error al agregar el producto');

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al agregar el producto.',
        footer: error.errors.join('\n'), // Mostrar los mensajes de error en el cuerpo de la alerta

      }).then({
        
      });
    }
  };

  return (
    <>
      {/* Modal para guardar reseñas */}
      <Modal
        show={openModal} //Abrir Modal
        onClose={handleModalSet} //Cerrar Modal
        position={"center"} //Posicion
        size={"md"} //tamaño
      >
        {/* Modal Body */}
        <div className="bg-Moradote dark:bg-woodsmoke w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="dark:bg-azulO bg-azul rounded-t-lg flex w-full h-20 items-center justify-center">
            <span className="text-xl font-bold">
              Agregar Artículo
            </span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            <form
              encType="multipart/form-data"
              className="text-azulO dark:text-white"
            >
              <div className="mb-4">
                <label
                  htmlFor="titulo"
                  className="block text-xl font-bold mb-2"
                >
                  Titulo
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  onChange={(e) => {
                    setTitulo(e.target.value);
                  }}
                  placeholder="Ingrese el titulo del artículo"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="texto"
                  className="block text-xl font-bold mb-2"
                >
                  Texto del Articulo
                </label>
                <textarea
                  name="texto"
                  onChange={(e) => {
                    setTexto(e.target.value);
                  }}
                  placeholder="Ingrese el contenido del artículo"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="titulo"
                  className="block text-xl font-bold mb-2"
                >
                  Imagen
                </label>
                <input
                  className="text-sm dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full"
                  id="file_input"
                  type="file"
                  onChange={(e) => {
                    setImagen(e.target.files[0]);
                  }}
                  name="imagen"
                />
              </div>
            </form>
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={handleSubmit}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Agregar
              </button>
              <button
                onClick={() => {
                  setTitulo("");
                  setTexto("");
                  setImagen("");
                  handleModalSet();
                }}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddArt;
