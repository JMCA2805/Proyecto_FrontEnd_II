// Importaciones
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

// Api del backend para la solicitud
const APIEDIT = import.meta.env.VITE_EDIT_URL;

//Props
export default function EditUser({
  openEditModal,
  handleEditModalSet,
  usuarioSeleccionado,
  setUsuarioSeleccionado,
  setDatosActualizados,
  handleInputChange,
  datosActualizados,
  handleUp,
}) {

  // Inicializacion de estados
  const actualizarUsuario = (event) => {
    event.preventDefault(); // Evita que la página se reinicie por defecto

    axios
      .put(APIEDIT, {
        correo: usuarioSeleccionado.correo,
        datosActualizados,
      })
      .then((response) => {
        
        setUsuarioSeleccionado(null);
        setDatosActualizados({});
        handleUp();


        // Mensaje de confirmación
        Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
            handleEditModalSet();
          });
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);

        // Mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el usuario",
          text: "Ocurrió un error al actualizar los datos del usuario. Por favor, inténtalo nuevamente.",
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
            <span className="text-xl font-bold">Editar usuario</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            {usuarioSeleccionado != null ? (
              <>
                <form
                  encType="multipart/form-data"
                  className="text-azulO dark:text-white"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-xl font-bold mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      defaultValue={datosActualizados.nombre || ""}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="apellido"
                      className="block text-xl font-bold mb-2"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      defaultValue={datosActualizados.apellido || ""}
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
                      defaultValue={datosActualizados.descripcion}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="telefono"
                      className="block text-xl font-bold mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      type="number"
                      id="telefono"
                      name="telefono"
                      defaultValue={datosActualizados.telefono || ""}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
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
                onClick={actualizarUsuario}
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