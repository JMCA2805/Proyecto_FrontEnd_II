// Importaciones
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

// Api del backend para la solicitud
const API = import.meta.env.VITE_EDITOFF_URL;

//Props
export default function EditSer({
  openEditModal,
  handleEditModalSet,
  ofertasSeleccionado,
  setOfertaSeleccionado,
  setDatosActualizados,
  handleInputChange,
  datosActualizados,
  handleUp,
}) {
  // Inicializacion de estados
  const [icon, setIcon] = useState("");

  const Actualizar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("viejo", ofertasSeleccionado.oferta);
    formData.append("oferta", datosActualizados.oferta);
    formData.append("descripcion", datosActualizados.descripcion);
    formData.append("icono", icon);
    axios
      .put(API, formData)
      .then((response) => {
        setOfertaSeleccionado(null)
        setDatosActualizados({});
        handleUp();

        Swal.fire({
          icon: "success",
          title: "Oferta o Descuento actualizado",
          showConfirmButton: true,
        }).then(() => {
          handleEditModalSet();
        });
      })
      .catch((error) => {
        console.error("Error al actualizar la oferta o descuento:", error);

        // Mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la oferta",
          text: "Ocurrió un error al actualizar los datos de la oferta o descuento. Por favor, inténtalo nuevamente.",
        });
      });
  };

  return (
    <>
      {/* Modal para guardar reseñas */}
      <Modal
        show={openEditModal} //Abrir Modal
        onClose={handleEditModalSet} //Cerrar Modal
        position={"center"} //Posicion
        size={"md"} //tamaño
      >
        <div className="bg-Moradote dark:bg-woodsmoke w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="dark:bg-azulO bg-azul rounded-t-lg flex w-full h-20 items-center justify-center">
            <span className="text-xl font-bold">Editar Oferta o Descuento</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            {ofertasSeleccionado != null ? (
              <>
                <form
                  encType="multipart/form-data"
                  className="text-azulO dark:text-white"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="oferta"
                      className="block text-xl font-bold mb-2"
                    >
                      Oferta
                    </label>
                    <input
                      type="text"
                      id="oferta"
                      name="oferta"
                      defaultValue={ofertasSeleccionado.oferta}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
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
                      defaultValue={ofertasSeleccionado.descripcion}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="oferta"
                      className="block text-xl font-bold mb-2"
                    >
                      Icono
                    </label>
                    <input
                      className="text-sm dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full"
                      id="file_input"
                      type="file"
                      onChange={(e) => {
                        setIcon(e.target.files[0]);
                      }}
                      name="icono"
                    />
                  </div>
                </form>
              </>
            ) : null}
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={Actualizar}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Guardar
              </button>
              <button
                onClick={()=>{handleEditModalSet()}}
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
