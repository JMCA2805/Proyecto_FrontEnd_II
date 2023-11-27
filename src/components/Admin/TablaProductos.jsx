import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AddProd from "./Modal/AddProd";

const API = import.meta.env.VITE_BACKEND_URL;

export default function TablaProductos() {
  const [data, setData] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [edicionProducto, setEdicionProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para indicador de carga
  const [errores, setErrores] = useState({});
  const [up, setUp] = useState(true);
  const handleUp = () => setUp(!up);

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalSet = () => setOpenEditModal(!openEditModal);

  const validarCampos = () => {
    const errores = {};

    if (!edicionProducto.nombre) {
      errores.nombre = "Por favor, ingresa un nombre.";
    }

    if (!edicionProducto.descripcion) {
      errores.descripcion = "Por favor, ingresa una descripción.";
    } else if (edicionProducto.descripcion.split(" ").length > 100) {
      errores.descripcion =
        "La descripción debe tener un máximo de 100 palabras.";
    }

    if (!edicionProducto.precio || edicionProducto.precio < 1) {
      errores.precio =
        "Por favor, ingresa un precio válido (mayor o igual a 1).";
    }

    if (!edicionProducto.cantidad || edicionProducto.cantidad < 1) {
      errores.cantidad = "Por favor, ingresa una cantidad válida (mayor a 1).";
    }

    if (!edicionProducto.categoria) {
      errores.categoria = "Por favor, ingresa una categoría.";
    }
    setErrores(errores);

    return errores;
  };

  useEffect(() => {
    // Lógica para obtener los datos de los ofertas desde el backend
    axios
      .get(API)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [up]);


    
    return (
      <>
      <AddProd
        openModal={openModal}
        handleModalSet={handleModalSet}
        handleUp={handleUp}
      />
      /* Encabezado */
      <div className="w-full px-10 h-full">
        <div className="md:px-8 px-4 py-4 w-full h-full rounded-xl dark:bg-azulO/50 bg-azulC/80 mb-4">
          <div className="font-[Barlow] mb-8 px-4">
            <div className="bg-azul dark:bg-azulO rounded-lg p-4 mx-4 mt-4 sm:mx-28 mb-2 border dark:border-azulC border-azulO">
              <h2 className="text-white text-3xl font-bold text-center">
            Inventario/Crear
          </h2>
        </div>
        <div className="w-full flex justify-center items-center md:justify-end md:items-end pb-2">
              <button
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                onClick={handleModalSet}              
              >
                Agregar Producto
              </button>
            </div>
        {data.length > 0 ? (
          <div className="overflow-x-auto  shadow rounded-xl overflow-hidden h-full dark:border-azulC border border-azulO">
           <table className=" w-full leading-normal text-xs md:text-sm text-left">
                  <thead className="text-white bg-azul dark:bg-azulO border-b dark:border-azulC border-azulO">
                    <tr className="text-center">
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Serial
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Nombre
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Descripción
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Precio
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Cantidad
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Categoría
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-azulW dark:bg-black/50 text-azulO dark:text-white">
              {data.map((producto) => ( //Guardar en estado de componente
                <tr key={producto.serial} id={producto.serial}>
                  <td className="sm:p-2 md:px-6 md:py-3 text-center">
                    {producto.serial}
                  </td>
                  <td className="sm:p-2 md:px-6 md:py-3 text-center">
                    {producto.nombre}
                  </td>
                  <td className="sm:p-2 md:px-6 md:py-3 text-center">
                    {producto.descripcion}
                  </td>
                  <td className="sm:p-2 md:px-6 md:py-3 text-center">
                    {producto.precio}
                  </td>
                  <td className="sm:p-2 md:px-6 md:py-3 text-center">
                    {producto.cantidad}
                  </td>
                  <td className="sm:p-2 md:px-6 md:py-3 text-center">
                    {producto.categoria}
                  </td>
                  <td className="px-4 md:py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                      <button
                      className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() => editarProducto(producto)}
                      >
                        Editar
                      </button>
                      <button
                      className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() => eliminarProducto(producto.serial)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No se encontraron productos.
          </div>
        )}
      </div>
      </div>
      </div>
      </>
      
    );
}
