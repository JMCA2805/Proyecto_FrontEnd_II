import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditOff from "./Modal/EditOff";
import AddOff from "./Modal/AddOff";

const API = import.meta.env.VITE_GETOFF_URL;
const APIDELETE = import.meta.env.VITE_DELOFF_URL;

const TablaOffers = () => {
  const [ofertas, setOfertas] = useState([]);
  const [up, setUp] = useState(true);
  const handleUp = () => setUp(!up);

  const [ofertasSeleccionado, setOfertaSeleccionado] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosActualizados({ ...datosActualizados, [name]: value });
  };

  const editarOferta = (oferta) => {
    setOfertaSeleccionado(oferta);
    setDatosActualizados({ ...oferta });
  };

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalSet = () => setOpenEditModal(!openEditModal);

  useEffect(() => {
    // Lógica para obtener los datos de los ofertas desde el backend
    axios
      .get(API)
      .then((response) => {
        setOfertas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [up]);

  const eliminarOferta = (off) => {
    // Mostrar confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la oferta o descuento. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(APIDELETE, {
            data: {
              oferta: off,
            },
          })
          .then((response) => {
            handleUp()
            // Mensaje de confirmación
            Swal.fire({
              icon: "success",
              title: "oferta eliminada",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error al eliminar la oferta:", error);

            // Mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar la oferta",
              text: "Ocurrió un error al eliminar la oferta. Por favor, inténtalo nuevamente.",
            });
          });
      }
    });
  };

  return (
    <>
      <AddOff
        openModal={openModal}
        handleModalSet={handleModalSet}
        handleUp={handleUp}
      />
      <EditOff
        openEditModal={openEditModal}
        handleEditModalSet={handleEditModalSet}
        ofertasSeleccionado={ofertasSeleccionado}
        setOfertaSeleccionado={setOfertaSeleccionado}
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
                Lista de Ofertas y Descuentos
              </h2>
            </div>
            <div className="w-full flex justify-center items-center md:justify-end md:items-end pb-2">
              <button
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                onClick={handleModalSet}
              >
                Agregar Oferta o Descuento
              </button>
            </div>
            {ofertas.length === 0 ? (
              <div className="flex w-full justify-center items-center dark:text-white text-azulO font-bold">
                <p>No hay ofertas disponibles.</p>
              </div>
            ) : (
              <div className="overflow-x-auto  shadow rounded-xl overflow-hidden h-full dark:border-azulC border border-azulO">
                <table className=" w-full leading-normal text-xs md:text-sm text-left">
                  <thead className="text-white bg-azul dark:bg-azulO border-b dark:border-azulC border-azulO">
                    <tr className="text-center">
                      <th
                        scope="col"
                        className="px-4 md:py-3 text-center"
                      >
                        Oferta / Descuento
                      </th>
                      <th
                        scope="col"
                        className="px-4 md:py-4 whitespace-nowrap overflow-y-auto max-h-40"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="px-4 md:py-3 text-center w-32"
                      >
                        Icono
                      </th>
                      <th
                        scope="col"
                        className="px-4 md:py-3 text-center"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-azulW dark:bg-black/50 text-azulO dark:text-white">
                    {Array.isArray(ofertas) ? (
                      ofertas.map((oferta, index) => (
                        <tr key={index}>
                          <td className="px-4 md:py-4 whitespace-nowrap">
                            {oferta.oferta}
                          </td>
                          <td className="px-4 md:py-4 whitespace-nowrap overflow-y-auto max-h-40">
                            {oferta.descripcion}
                          </td>
                          <td className="px-4">
                            <img
                              src={oferta.imagen}
                              alt={oferta.oferta}
                              className="w-20 max-w-none object-cover rounded-full"
                            />
                          </td>
                          <td className="px-4 md:py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <button
                                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() => {
                                  editarOferta(oferta);
                                  handleEditModalSet();
                                }}
                              >
                                Editar
                              </button>
                              <button
                                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() => {
                                  eliminarOferta(oferta.oferta);
                                }}
                              >
                                Borrar
                              </button>
                              {/* Otros botones de acción */}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="dark:text-white text-azulO font-bold"
                        >
                          Cargando ofertas...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TablaOffers;
