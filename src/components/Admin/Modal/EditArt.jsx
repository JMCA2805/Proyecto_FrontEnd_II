// Importaciones
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

// Api del backend para la solicitud
const APIEDIT = import.meta.env.VITE_EDITART_URL;


//Props
export default function EditArt({
  openEditModal,
  handleEditModalSet,
  articuloSeleccionado,
  setArticuloSeleccionado,
  setDatosActualizados,
  handleInputChange,
  datosActualizados,
  handleUp,
}) {
  // Inicializacion de estados
  const [imagen, setImagen] = useState("");

  const actualizarArticulo = (event) => {
    event.preventDefault(); // Evita que la página se reinicie por defecto

    const formData = new FormData();
    formData.append("titulo", datosActualizados.titulo);
    formData.append("tituloviejo", articuloSeleccionado.titulo);
    formData.append("texto", datosActualizados.texto);
    formData.append("imagen", imagen);

    console.log(articuloSeleccionado.titulo)
    console.log(datosActualizados.titulo)


    axios
      .put(APIEDIT, formData)
      .then((response) => {
        // Obtener la URL de la imagen actualizada del cuerpo de la respuesta

        const imagenActualizada = response.data.imagen;

        setArticuloSeleccionado(null);
        setDatosActualizados({});
        handleUp();


        // Mensaje de confirmación
        Swal.fire({
          icon: "success",
          title: "Articulo actualizado",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
            handleEditModalSet();
          });
        })
      .catch((error) => {
        console.error("Error al actualizar el articulo:", error);

        // Mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el articulo",
          text: "Ocurrió un error al actualizar los datos del articulo. Por favor, inténtalo nuevamente.",
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
            <span className="text-xl font-bold">Editar Artículo</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            {articuloSeleccionado != null ? (
              <>
                <form
                  encType="multipart/form-data"
                  className="text-azulO dark:text-white"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="titulo"
                      className="block text-xl font-bold mb-2"
                    >
                      Titulo
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      defaultValue={articuloSeleccionado.titulo}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="texto"
                      className="block text-xl font-bold mb-2"
                    >
                      Contenido del Artículo
                    </label>
                    <textarea
                      name="texto"
                      defaultValue={articuloSeleccionado.texto}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="titulo"
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
              </>
            ) : null}
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={actualizarArticulo}
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
