import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { Modal } from "flowbite-react";

const APIEDIT = import.meta.env.VITE_EDIT_URL;

export default function EditProfile({
  openModal,
  handleModalSet,
  handleUp,
  datosActualizados,
  setDatosActualizados,
  handleInputChange,
  user,
  userData
}) {
  const actualizarUsuario = (e) => {
    e.preventDefault(); // Evita que la página se reinicie por defecto

    axios
      .post(`${APIEDIT}/${user.id}`, {
        id: user.id,
        datosActualizados,
      })
      .then((response) => {
        setDatosActualizados({});
        handleUp();
        handleModalSet();
        // Mensaje de confirmación
        Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 1500,
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
        show={openModal} //Abrir Modal
        onClose={handleModalSet} //Cerrar Modal
        position={"center"} //Posicion
        size={"md"} //tamaño
      >
        {/* Modal Body */}
        <div className="bg-Moradote dark:bg-woodsmoke w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="dark:bg-azulO bg-azul rounded-t-lg flex w-full h-20 items-center justify-center">
            <span className="text-xl font-bold">Editar Perfil</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            <form
              encType="multipart/form-data"
              className="text-azulO dark:text-white"
            >
              {/* Campos existentes */}
              <div className="flex flex-col mt-2">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  defaultValue={userData?.telefono}
                  onChange={handleInputChange}
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="descripcion">Descripción:</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  defaultValue={userData?.descripcion}
                  onChange={handleInputChange}
                  className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                />
              </div>
            </form>
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
                onClick={() => {
                  handleModalSet();
                }}
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
