import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { Modal } from "flowbite-react";

import * as Yup from "yup";



//Api de servidor backend
const API = import.meta.env.VITE_ADDOFF_URL;

const validationSchema = Yup.object().shape({
  oferta: Yup.string().required("Por favor, ingresa una oferta o descuento."),
  descripcion: Yup.string().required("Por favor, ingresa una descripción."),
  icono: Yup.mixed().required("Por favor, selecciona un icono."),
});

function AddOff({ openModal, handleModalSet, handleUp }) {
  // Inicializacion de estados
  const [oferta, setOferta] = useState("");
  const [descripcion, setDesc] = useState("");
  const [icono, setIcono] = useState("");

  const [respuesta, setRespuesta] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);


  // Funcion para cargar un nuevo oferta
  const handleSubmit = async (e) => {
    e.preventDefault();

    // datos a enviar
    const formData = new FormData();
    formData.append("oferta", oferta);
    formData.append("descripcion", descripcion);
    formData.append("icono", icono);

    // Verificar que los campos obligatorios no estén vacíos
    if (!icono) {
      console.log("Por favor, ingresa la imagen del icono.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa la imagen del iconos.",
      }).then({});
      return;
    }

    try {
      await validationSchema.validate({ oferta, descripcion, icono });

      const response = await axios.post(`${API}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Mostrar mensaje de confirmación con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Servicio agregado",
        text: "La oferta o Descuento se ha registrado exitosamente.",
      });

      setRespuesta(response.data);
      setMostrarMensaje(true);

      setOferta("");
      setDesc("");
      setIcono("");
      handleModalSet();
      handleUp();
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al agregar el oferta.",
        footer: error.errors.join('\n'), // Mostrar los mensajes de error en el cuerpo de la alerta

      }).then({});
    }
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
            <span className="text-xl font-bold">
              Agregar Oferta o Descuento
            </span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
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
                  onChange={(e) => {
                    setOferta(e.target.value);
                  }}
                  placeholder="Ingrese una oferta o descuento"
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
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  placeholder="Ingrese la descripción de la oferta o descuento"
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
                    setIcono(e.target.files[0]);
                  }}
                  name="icono"
                />
              </div>
            </form>
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={handleSubmit}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Agregar
              </button>
              <button
                onClick={() => {
                  setOferta("");
                  setDesc("");
                  setIcono("");
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

export default AddOff;
