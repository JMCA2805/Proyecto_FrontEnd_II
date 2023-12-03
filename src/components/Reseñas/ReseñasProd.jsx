// Importaciones
import { Modal } from "flowbite-react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// Api del backend para la solicitud
const API = import.meta.env.VITE_PRODREVIEWSADD_URL;

//Props
export default function AgregarResProd({ openModal2, handleModalSet2, tipo, productonombre, serial }) {
  // Inicializacion de estados
  const [comentario, setComentario] = useState("");
  const { user } = useContext(AuthContext);

  // Funcion para añadir reseñas
  const Añadir = async (e) => {
    e.preventDefault();
  
    const data = {
      tipo: "producto",
      producto: productonombre,
      nombre: user.nombre,
      comentario: comentario,
      serial: serial,
      userid : user.id
    };
  
    try {
      const response = await axios.post(API, data);
  
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
        <div className="bg-Moradote dark:bg-black w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="bg-MoradoO/80 rounded-t-lg dark:bg-black flex w-full h-20 items-center justify-center border-b dark:border-VerdeC/50 border-MoradoO ">
            <span className="text-xl font-bold">Añadir Reseña</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            <div className="w-full flex p-4 text-center justify-center font-bold">
              <span>¿Que te pareció esta habitación?</span>
            </div>
            <textarea
              name="Comentarios"
              onChange={(e) => {
                setComentario(e.target.value);
              }}
              className="bg-MoradoO/30 border border-MoradoO text-white placeholder:text-white/50 sm:text-sm rounded-lg focus:border-2 focus:border-MoradoO focus:ring-0 block w-full p-4 dark:border-VerdeC/50 dark:focus:border-VerdeC h-60"
            />
          </div>
          {/* Modal Footer */}
          <div className="bg-MoradoO/80 rounded-b-lg dark:bg-black flex bottom-0 w-full h-20 items-center border-t dark:border-VerdeC/50 border-MoradoO">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={Añadir}
                className="inline-block rounded-md bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-MoradoC dark:hover:bg-MoradoC focus-within:bg-MoradoO "
              >
                <div className="flex rounded-md dark:border dark:border-VerdeO w-full h-full px-3 py-2 text-white font-bold justify-center">
                  Añadir
                </div>
              </button>
              <button
                onClick={() => {
                  setComentario("");
                  handleModalSet2();
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
