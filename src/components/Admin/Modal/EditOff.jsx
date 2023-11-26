// Importaciones
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

// Api del backend para la solicitud
const API = import.meta.env.VITE_EDITSER_URL;

//Props
export default function EditSer({
  openModal,
  handleModalSet,
  servicioSeleccionado,
  handleInputChange,
  setServicioSeleccionado,
  servicios,
  datosActualizados,
  setServicios,
  setDatosActualizados,
  handleUp
}) {
  // Inicializacion de estados
  const [icon, setIcon] = useState("");

  const Actualizar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("viejo", servicioSeleccionado.servicio);
    formData.append("servicio", datosActualizados.servicio);
    formData.append("descripcion", datosActualizados.descripcion);
    formData.append("icono", icon);
    axios
      .put(API, formData)
      .then((response) => {
        const serviciosActualizados = servicios.map((servicio) => {
          if (servicio.servicio === servicioSeleccionado.servicio) {
            return { ...servicio, ...datosActualizados };
          }
          return servicio;
        });
        setServicios(serviciosActualizados);

        setServicioSeleccionado(null);
        setDatosActualizados({});

        // Mensaje de confirmación
        handleUp()
        Swal.fire({
          icon: "success",
          title: "Servicio actualizado",
          showConfirmButton: true,
        }).then(()=>{
          handleModalSet()
        })
      })
      .catch((error) => {
        console.error("Error al actualizar el servicio:", error);

        // Mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el servicio",
          text: "Ocurrió un error al actualizar los datos del servicio. Por favor, inténtalo nuevamente.",
        });
      });
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
        <div className="bg-Moradote dark:bg-black w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="bg-MoradoO/80 rounded-t-lg dark:bg-black flex w-full h-20 items-center justify-center border-b dark:border-VerdeC/50 border-MoradoO ">
            <span className="text-xl font-bold">Editar Servicio</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            <form encType="multipart/form-data" className="text-white">
              {servicioSeleccionado != null ? (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="servicio"
                      className="block text-xl font-bold mb-2"
                    >
                      Servicio
                    </label>
                    <input
                      type="text"
                      id="servicio"
                      name="servicio"
                      defaultValue={servicioSeleccionado.servicio}
                      onChange={handleInputChange}
                      className="bg-MoradoO/30 border border-MoradoO text-white placeholder:text-white/50 sm:text-sm rounded-lg focus:border-2 focus:border-MoradoO focus:ring-0 block w-full p-2.5 dark:border-VerdeC/50 dark:focus:border-VerdeC"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="descripcion"
                      className="block text-xl font-bold mb-2"
                    >
                      Descripcion
                    </label>
                    <textarea
                      name="descripcion"
                      defaultValue={servicioSeleccionado.descripcion}
                      onChange={handleInputChange}
                      className="bg-MoradoO/30 border border-MoradoO text-white placeholder:text-white/50 sm:text-sm rounded-lg focus:border-2 focus:border-MoradoO focus:ring-0 block w-full p-4 dark:border-VerdeC/50 dark:focus:border-VerdeC h-28"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="servicio"
                      className="block text-xl font-bold mb-2"
                    >
                      Icono
                    </label>
                    <input
                      className="block w-full text-sm text-VerdeO border border-gray-300 rounded-lg cursor-pointer bg-VerdeO dark:text-white focus:outline-none dark:bg-VerdeO dark:border-gray-VerdeO dark:placeholder-VerdeO"
                      id="file_input"
                      type="file"
                      onChange={(e) => {
                        setIcon(e.target.files[0]);
                      }}
                      name="icono"
                    />
                  </div>
                </>
              ) : null}
            </form>
          </div>
          {/* Modal Footer */}
          <div className="bg-MoradoO/80 rounded-b-lg dark:bg-black flex bottom-0 w-full h-20 items-center border-t dark:border-VerdeC/50 border-MoradoO">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={Actualizar}
                className="inline-block rounded-md bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-MoradoC dark:hover:bg-MoradoC focus-within:bg-MoradoO "
              >
                <div className="flex rounded-md dark:border dark:border-VerdeO w-full h-full px-3 py-2 text-white font-bold justify-center">
                  Actualizar
                </div>
              </button>
              <button
                onClick={() => {
                  setServicioSeleccionado(null);
                  setIcon("");
                  handleModalSet();
                }}
                className="inline-block rounded-md bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-MoradoC dark:hover:bg-MoradoC focus-within:bg-MoradoO "
              >
                <div className="flex rounded-md dark:border dark:border-VerdeO w-full h-full px-3 py-2 text-white font-bold justify-center">
                  Cancelar
                </div>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}