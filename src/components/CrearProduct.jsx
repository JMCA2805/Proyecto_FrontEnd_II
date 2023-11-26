import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const API = import.meta.env.VITE_BACKEND_URL;

function AgregarProductos() {
  const [serial, setSerial] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('serial', serial);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('cantidad', cantidad);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('imagen', imagen);

    // Verificar que los campos obligatorios no estén vacíos
    if (!serial || !nombre || !descripcion || cantidad <= 0 || precio <= 0 || !categoria || !imagen) {
      setRespuesta('Por favor, completa todos los campos y asegúrate de que los valores numéricos sean mayores que cero.');
      setMostrarMensaje(true);
      return;
    }

    const producto = {
      serial,
      nombre,
      descripcion,
      cantidad,
      precio,
      categoria
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

      setSerial('');
      setNombre('');
      setDescripcion('');
      setCantidad(0);
      setPrecio(0);
      setCategoria('');
      setImagen('');

      // Mostrar mensaje de confirmación con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha registrado exitosamente.',
      });
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
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-8 mr-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900">Agregar Producto</h1>
          </div>
          <form className="mt-8 space-y-6 flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
              Serial:
              <input
                type="text"
                value={serial}
                className="w-full rounded-lg"
                onChange={(e) => setSerial(e.target.value)}
              />
            </label>
            <label>
              Nombre:
              <input
                type="text"
                value={nombre}
                className="w-full rounded-lg"
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label>
              Descripción:
              <input
                type="text"
                value={descripcion}
                className="w-full rounded-lg"
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                value={cantidad}
                className="w-full rounded-lg"
                onChange={(e) => setCantidad(parseInt(e.target.value))}
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                value={precio}
                className="w-full rounded-lg"
                onChange={(e) => setPrecio(parseFloat(e.target.value))}
              />
            </label>
            <label>
              Categoría:
              <select
                value={categoria}
                className="w-full rounded-lg"
                onChange={(e) => setCategoria(e.target.value)}
              >
                  <option value="">Selecciona una categoría</option>
                  <option value="Computadoras">Computadoras</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Telefonos">Teléfonos</option>
                  <option value="Perifericos">Periféricos</option>

              </select>
            </label>
            <label>
              Foto del Producto:
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-verdeo hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Agregar Producto
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
    </div>
  );
}

export default AgregarProductos;