import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AddArt from "./Modal/AddArt";
import EditArt from "./Modal/EditArt";

const API = import.meta.env.VITE_GETART_URL;
const APIDELETE = import.meta.env.VITE_DELETEART_URL;

const ArticuloTable = () => {
  const [articulos, setArticulos] = useState([]);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});
  const [imagen, setImagen] = useState("");

  const [up, setUp] = useState(true);
  const handleUp = () => setUp(!up);

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalSet = () => setOpenEditModal(!openEditModal);

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setArticulos(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [up]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosActualizados({ ...datosActualizados, [name]: value });
  };

  const editarArticulo = (articulo) => {
    setArticuloSeleccionado(articulo);
    setDatosActualizados({ ...articulo });
  };



  const eliminarArticulo = (titulo) => {
    // Mostrar confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al articulo. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(APIDELETE, { data: { titulo: titulo } })
          .then((response) => {
            // Filtra los articulos y excluye al articulo eliminado
            const articulosActualizados = articulos.filter(
              (articulo) => articulo.titulo !== titulo
            );
            setArticulos(articulosActualizados);

            // Mensaje de confirmación
            Swal.fire({
              icon: "success",
              title: "Articulo eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error al eliminar el articulo:", error);

            // Mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el articulo",
              text: "Ocurrió un error al eliminar el articulo. Por favor, inténtalo nuevamente.",
            });
          });
      }
    });
  };
  return (
    <>
      <AddArt
        openModal={openModal}
        handleModalSet={handleModalSet}
        handleUp={handleUp}
      />
      <EditArt
        openEditModal={openEditModal}
        handleEditModalSet={handleEditModalSet}
        articuloSeleccionado={articuloSeleccionado}
        setArticuloSeleccionado={setArticuloSeleccionado}
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
                Lista de Productos
              </h2>
            </div>
            <div className="w-full flex justify-center items-center md:justify-end md:items-end pb-2">
              <button
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                onClick={handleModalSet}
              >
                Agregar Articulo
              </button>
            </div>
            <div className="font-[Barlow] mb-8">
              {articulos.length === 0 ? (
                <div className="flex w-full justify-center items-center text-white">
                  <p>No hay artículos disponibles.</p>
                </div>
              ) : (
                <div className="w-full px-10 h-full">
                  <div className="overflow-x-auto p-8 w-full h-full rounded-xl dark:bg-azulO/50 bg-azulW/50">
                    <div className="inline-block min-w-full shadow rounded-xl overflow-hidden h-full dark:border-azulC border border-azulO">
                      <table className="min-w-full leading-normal text-xs md:text-sm text-left">
                        <thead className="text-white bg-azul dark:bg-azulO border-b dark:border-azulC border-azulO">
                          <tr className="text-center">
                            <th
                              scope="col"
                              className="sm:p-2 md:px-6 md:py-3 text-center"
                            >
                              Título
                            </th>
                            <th
                              scope="col"
                              className="sm:p-2 md:px-6 md:py-4 whitespace-nowrap overflow-y-auto max-h-40"
                            >
                              Texto
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
                          {articulos.map((articulo) => (
                            <tr
                              key={articulo.id}
                              className="text-center text-black dark:text-white"
                            >
                              <td className="sm:p-2 md:px-6 md:py-4 whitespace-nowrap">
                                {articulo.titulo}
                              </td>
                              <td className="sm:p-2 md:px-6 md:py-4 whitespace-nowrap overflow-y-auto max-h-40">
                                {articulo.texto}
                              </td>
                              <td className="sm:p-2 md:px-6 md:py-4 whitespace-nowrap">
                                <img
                                  src={articulo.imagen}
                                  alt={articulo.titulo}
                                  className="w-20 h-20 object-cover rounded-full mx-auto"
                                />
                              </td>
                              <td className="sm:p-2 md:px-6 md:py-4 whitespace-nowrap">
                                <button
                                  className="text-white px-4 py-2 rounded-lg mr-2 bg-azul focus:outline-none focus:text-white border-b-4 dark:border-azulC border-azulO hover:bg-azulO dark:hover:bg-azulC/70 focus-within:bg-azulO"
                                  onClick={() => {
                                    editarArticulo(articulo);
                                    handleEditModalSet();
                                  }}                                >
                                  Editar
                                </button>
                                <button
                                  className="text-white px-4 py-2 rounded-lg mr-2 bg-azul focus:outline-none focus:text-white border-b-4 dark:border-azulC border-azulO hover:bg-azulO dark:hover:bg-azulC/70 focus-within:bg-azulO"
                                  onClick={() =>
                                    eliminarArticulo(articulo.titulo)
                                  }
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              {articuloSeleccionado && (
                <div className="bg-azulC dark:bg-azulO rounded-lg p-4 mx-4 sm:mx-28 mb-8 border dark:border-VerdeC border-azulO">
                  <h2 className="text-white text-3xl font-bold text-center">
                    Editar Artículo
                  </h2>
                  <form className="mt-4 text-white">
                    <div className="mb-4">
                      <label
                        htmlFor="titulo"
                        className="block text-xl font-bold mb-2"
                      >
                        Título:
                      </label>
                      <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={datosActualizados.titulo || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-azulO dark:bg-azulC border border-azulO dark:border-VerdeC focus:outline-none focus:border-VerdeC"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="Texto"
                        className="block text-xl font-bold mb-2"
                      >
                        Texto:
                      </label>
                      <input
                        type="text"
                        id="texto"
                        name="texto"
                        value={datosActualizados.texto || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-azulO dark:bg-azulC border border-azulO dark:border-VerdeC focus:outline-none focus:border-VerdeC"
                      />
                    </div>
                    <div className="mb-4">
                      <label>
                        Foto del Articulo:
                        <input
                          className="block w-full text-sm text-black  border  border-gray-300 rounded-lg cursor-pointer bg-azulO dark:text-white focus:outline-none dark:bg-azulO dark:border-gray-azulO dark:placeholder-azulO"
                          id="file_input"
                          type="file"
                          onChange={(e) => {
                            setImagen(e.target.files[0]);
                          }}
                          name="imagen"
                        />
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="bg-azulO hover:bg-azulW hover:text-black dark:bg-azulC text-white font-bold py-2 px-4 rounded mx-1"
                      >
                        Actualizar
                      </button>
                      <button
                        type="button"
                        className="bg-azulO hover:bg-azulW hover:text-black dark:bg-azulC text-white font-bold py-2 px-4 rounded mx-1"
                        onClick={() => setArticuloSeleccionado(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticuloTable;
