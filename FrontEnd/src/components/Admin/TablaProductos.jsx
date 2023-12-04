import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AddProd from "./Modal/AddProd";
import EditProd from "./Modal/EditProd";

const API = import.meta.env.VITE_PRODUCTS_URL;

export default function TablaProductos() {
  const [data, setData] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});
  const [up, setUp] = useState(true);
  const handleUp = () => setUp(!up);

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalSet = () => setOpenEditModal(!openEditModal);

  useEffect(() => {
    // Lógica para obtener los datos de los ofertas desde el backend
    axios
      .get(API, {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [up]);

  // Eliminar un producto
  //Esta función se utiliza para eliminar un producto del backend. Realiza una solicitud DELETE a la API, pasando el serial del producto que se desea elimina
  const eliminarProducto = (id) => {
    // Mostrar confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API, { data: { serial: id } })
          .then((response) => {
            setData(data.filter((producto) => producto.serial !== id));
            handleUp();
            // Mensaje de confirmación
            Swal.fire({
              icon: "success",
              title: "Producto Eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error al eliminar el producto:", error);

            // Mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el producto",
              text: "Ocurrió un error al eliminar el producto. Por favor, inténtalo nuevamente.",
            });
          });
      }
    });
  };

  const editarProducto = (producto) => {
    setDatosActualizados({ ...producto });
    setProductoSeleccionado(producto);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosActualizados({ ...datosActualizados, [name]: value });
  };

  return (
    <>
      <AddProd
        openModal={openModal}
        handleModalSet={handleModalSet}
        handleUp={handleUp}
      />

      <EditProd
        openEditModal={openEditModal}
        handleEditModalSet={handleEditModalSet}
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
        setDatosActualizados={setDatosActualizados}
        handleInputChange={handleInputChange}
        datosActualizados={datosActualizados}
        handleUp={handleUp}
      />
      <div className="w-full px-10 h-full">
        <div className="md:px-8 px-4 py-4 w-full h-full rounded-xl dark:bg-azulO/50 bg-azulC/80 mb-4">
          <div className="font-[Barlow] mb-8 px-4">
            <div className="bg-azul dark:bg-azulO rounded-lg p-4 mx-4 mt-4 sm:mx-28 mb-2 border dark:border-azulC border-azulO">
              <h2 className="text-white text-3xl font-bold text-center">
                Inventario
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
                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Serial
                      </th>
                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Precio
                      </th>
                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Categoría
                      </th>

                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Imagen
                      </th>

                      <th
                        scope="col"
                        className="sm:p-2 md:px-6 md:py-3 text-center"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-azulW dark:bg-black/50 text-azulO dark:text-white">
                    {data.map(
                      (
                        producto //Guardar en estado de componente
                      ) => (
                        <tr
                          key={producto.serial}
                          id={producto.serial}
                          className="border-b dark:border-azulC border-azulO"
                        >
                          <td className="p-2 md:px-6 md:py-3 text-center">
                            {producto.serial}
                          </td>
                          <td className="p-2 md:px-6 md:py-3 text-center">
                            {producto.nombre}
                          </td>
                          <td className="p-2 md:px-6 md:py-3">
                            <div className="pr-2 flex overflow-x-auto max-h-40 text-justify">
                              {producto.descripcion}
                            </div>
                          </td>
                          <td className="p-2 md:px-6 md:py-3 text-center">
                            {producto.precio}
                          </td>
                          <td className="p-2 md:px-6 md:py-3 text-center">
                            {producto.cantidad}
                          </td>
                          <td className="p-2 md:px-6 md:py-3 text-center">
                            {producto.categoria}
                          </td>
                          <td className="p-2 md:px-6 md:py-4 whitespace-nowrap">
                            <img
                              src={producto.imagen}
                              alt={producto.titulo}
                              className="w-20 h-20 object-cover rounded-full mx-auto"
                            />
                          </td>
                          <td className="px-4 md:py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <button
                                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() => {
                                  editarProducto(producto);
                                  handleEditModalSet();
                                }}
                              >
                                Editar
                              </button>
                              <button
                                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() =>
                                  eliminarProducto(producto.serial)
                                }
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
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
