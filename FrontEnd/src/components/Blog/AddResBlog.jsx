// Importaciones
import { Modal } from "flowbite-react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// Api del backend para la solicitud
const API = import.meta.env.VITE_ARTREVIEWSADD_URL;

//Props
export default function AgregarResArt({ openModal2, handleModalSet2, tipo, articulo }) {
  // Inicializacion de estados
  const [comentario, setComentario] = useState("");
  const { user } = useContext(AuthContext);
  

  // Funcion para añadir reseñas
  const Añadir = async (e) => {
    e.preventDefault();
  
    const data = {
      tipo: "articulo",
      articulonombre: articulo.titulo,
      nombre: user.nombre,
      comentario: comentario,
      userid : user.id
    };
  
    try {
      const response = await axios.post(API, data);
      console.log(data)
  
      Swal.fire({
        icon: "success",
        title: "Reseña Enviada",
        text: "¡Reseña enviada con exito!",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleModalSet2();
          setComentario("");
        } else {
          handleModalSet2();
          setComentario("");
        }
      });
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
  
      Swal.fire({
        icon: "error",
        title: "Error al enviar la reseña",
        text: "Porfavor intente nuevamente",
      });
    }
  };


  return (
    <>
      {/* Modal para guardar reseñas */}
      <Modal
        show={openModal2} //Abrir Modal
        onClose={handleModalSet2} //Cerrar Modal
        position={"center"} //Posicion
        size={"md"} //tamaño
      >
        {/* Modal Body */}
        <div className="bg-Moradote dark:bg-woodsmoke w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="dark:bg-azulO bg-azul rounded-t-lg flex w-full h-20 items-center justify-center">
            <span className="text-xl font-bold">Añadir Reseña</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            <div className="w-full flex p-4 text-center justify-center font-bold text-black dark:text-white">
              <span>¿Que te pareció este Artículo?</span>
            </div>
            <textarea
              name="Comentarios"
              onChange={(e) => {
                setComentario(e.target.value);
              }}
              className="h-40 dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
            />
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={Añadir}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                  Añadir
              </button>
              <button
                onClick={() => {
                  setComentario("");
                  handleModalSet2();
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
