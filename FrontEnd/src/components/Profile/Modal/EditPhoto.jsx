import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { Modal } from "flowbite-react";
import { useState } from "react";

const API2 = import.meta.env.VITE_USERS_URL;

export default function EditPhoto({
  openModalPhoto,
  handleModalPhotoSet,
  handleUp,
  user,
}) {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [imagen, setImagen] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que los campos obligatorios no estén vacíos
    if (!imagen) {
      setRespuesta("Por favor, completa todos los campos.");
      setMostrarMensaje(true);
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);

    try {
      const response = await axios.post(`${API2}/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMostrarMensaje(true);
      handleUp();
      handleModalPhotoSet();
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
      setImagen("");
      // Mostrar mensaje de confirmación con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Foto de perfil cambiada",
        text: "Foto de perfil cambiada exitosamente.",
      });
    } catch (error) {
      console.error(error);
      setRespuesta("Ocurrió un error al cambiar la foto de perfil");

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al cambiar la foto de perfil",
      });
    }
  };

  return (
    <>
      {/* Modal para guardar reseñas */}
      <Modal
        show={openModalPhoto} //Abrir Modal
        onClose={handleModalPhotoSet} //Cerrar Modal
        position={"center"} //Posicion
        size={"md"} //tamaño
      >
        {/* Modal Body */}
        <div className="bg-Moradote dark:bg-woodsmoke w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="dark:bg-azulO bg-azul rounded-t-lg flex w-full h-20 items-center justify-center">
            <span className="text-xl font-bold">Editar Foto de Perfil</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            <form
              encType="multipart/form-data"
              className="text-azulO dark:text-white"
            >
              {/* Campos existentes */}
              <input
                className="block w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-azulC dark:text-white  focus:outline-none dark:bg-azulC dark:border-gray-azulC dark:placeholder-azulC"
                id="file_input"
                type="file"
                onChange={(e) => {
                  setImagen(e.target.files[0]);
                }}
                name="imagen"
              />
              {mostrarMensaje && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-6 rounded">
                  <p className="text-sm font-bold">{respuesta}</p>
                </div>
              )}
            </form>
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={handleSubmit}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setImagen("");
                  handleModalPhotoSet();
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
