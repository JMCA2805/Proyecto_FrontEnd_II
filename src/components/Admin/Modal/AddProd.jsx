import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { Modal } from "flowbite-react";
import * as yup from "yup";


//Api de servidor backend
const API = import.meta.env.VITE_PRODUCTS_URL;

const schema = yup.object().shape({
    serial: yup.string().required("El serial es obligatorio."),
    nombre: yup.string().required("El nombre del producto es obligatorio."),
    descripcion: yup.string().required("La descripción es obligatoria."),
    cantidad: yup
      .number()
      .positive("La cantidad debe ser mayor que cero.")
      .required("La cantidad es obligatoria."),
    precio: yup
      .number()
      .positive("El precio debe ser mayor que cero.")
      .required("El precio es obligatorio."),
    categoria: yup.string().required("La categoría es obligatoria."),

  });

function AddProd({ openModal, handleModalSet, handleUp }) {
  // Inicializacion de estados

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


    const producto = {
      serial,
      nombre,
      descripcion,
      cantidad,
      precio,
      categoria
    };

    console.log(imagen)


    try {
        await schema.validate({
            serial,
            nombre,
            descripcion,
            cantidad,
            precio,
            categoria,
            imagen,
          });


      const response = await axios.post(`${API}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setRespuesta(response.data);
      setMostrarMensaje(true);



      setSerial('');
      setNombre('');
      setDescripcion('');
      setCantidad(0);
      setPrecio(0);
      setCategoria('');
      setImagen('');
      handleModalSet();
      handleUp();

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
              Agregar Producto
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
                  htmlFor="serial"
                  className="block text-xl font-bold mb-2"
                >
                  Serial
                </label>
                <input
                  type="text"
                  id="serial"
                  name="serial"
                  onChange={(e) => {
                    setSerial(e.target.value);
                  }}
                  placeholder="Ingrese el serial del producto"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-xl font-bold mb-2"
                >
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  placeholder="Ingrese el serial del producto"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cantidad"
                  className="block text-xl font-bold mb-2"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  onChange={(e) => {
                    setCantidad(e.target.value);
                  }}
                  placeholder="Ingrese el numero de stock del producto"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="precio"
                  className="block text-xl font-bold mb-2"
                >
                  Precio
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  onChange={(e) => {
                    setPrecio(e.target.value);
                  }}
                  placeholder="Ingrese el precio del producto"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categoria"
                  className="block text-xl font-bold mb-2"
                >
                  Categoria
                </label>
                <select
                value={categoria}
                className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                onChange={(e) => setCategoria(e.target.value)}
              >
                  <option value="">Selecciona una categoría</option>
                  <option value="Computadoras">Computadoras</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Telefonos">Teléfonos</option>
                  <option value="Perifericos">Periféricos</option>
                  <option value="Accesorios">Accesorios</option>


              </select>
              </div>
              
              <div className="mb-4">
                <label
                  htmlFor="descripcion"
                  className="block text-xl font-bold mb-2"
                >
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  onChange={(e) => {
                    setDescripcion(e.target.value);
                  }}
                  placeholder="Ingrese la descripción de la serial o descuento"
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imagen"
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
                  setSerial("");
                  setDescripcion("");
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
        {mostrarMensaje && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-6 rounded">
              <p className="text-sm font-bold">{respuesta}</p>
            </div>
          )}
      </Modal>
    </>
  );
}

export default AddProd;
