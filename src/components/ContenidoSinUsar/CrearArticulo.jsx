import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const API = import.meta.env.VITE_ADDART_URL;

function CrearArticulo() {
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
    if ( !titulo || !texto  || !imagen) {
      setRespuesta('Por favor, completa todos los campos.');
      setMostrarMensaje(true);
      return;
    }

    const articulo = {
      titulo,
      texto,
    };

    try {
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

      setTitulo('');
      setTexto('');
      setImagen('');

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
      }).then({
        
      });
    }
  };

  return (
<div className="flex justify-center items-center my-8 md:px-4 lg:px-8 m-auto py-0 md:py-16 font-poppins bg-azulO/50 dark:bg-azulW/50 mx-4 rounded-2xl gap-8 md:gap-0 dark:border border-azulW dark:border-azulC/50">
  <div className="max-w-md w-full space-y-8 bg-azulO p-8 rounded-lg shadow-lg dark:bg-azulW border-azulW dark:border-azulC dark:border text-white">
    <div>
      <h1 className="text-center text-3xl font-semibold tracking-tight text-white dark:text-black">Agregar Articulo</h1>
    </div>
    <form className="mt-8 space-y-6 flex flex-col text-white dark:text-black" onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Titulo:
        <input
          type="text"
          value={titulo}
          className="w-full rounded-lg text-black"
          onChange={(e) => setTitulo(e.target.value)}
        />
      </label>
      <label>
        Texto:
        <input
          type="text"
          value={texto}
          className="w-full rounded-lg text-black"
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>
      <label>
        Foto del Articulo:
        <input
          className="block w-full text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-azulC dark:text-white focus:outline-none dark:bg-azulC dark:border-gray-azulC dark:placeholder-azulC"
          id="file_input"
          type="file"
          onChange={(e) => {
            setImagen(e.target.files[0]);
          }}
          name="imagen"
        />
      </label>
      <div>
        <button
          type="submit"
          className="py-2 px-4 rounded-md w-full col-span-2 border-b-4 dark:border-azulC border-azulW hover:bg-azulC dark:hover:bg-azulC/70 focus-within:bg-azulO text-white bg-azul dark:bg-azulO"
          >
          Agregar Articulo
        </button>
      </div>
    </form>

    {mostrarMensaje && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-6 rounded">
        <p className="text-sm font-bold">{respuesta}</p>
      </div>
    )}
  </div>
</div>
  );
}

export default CrearArticulo;