import { Button, Modal } from "flowbite-react";
import AgregarResProd from "./Reseñas/ReseñasProd";
import React, { useEffect, useState, useContext } from "react";
import ResProdComm from "./Reseñas/ResProdComm";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_PRODGETREVIEWS_URL;

function ProductModal({ item, modalOpen, closeModal }) {
  if (!item) {
    return null;
  }
  const { loggedIn } = useContext(AuthContext); // Access `loggedIn` state from the context
  const [openModal2, setOpenModal2] = useState(false);
  const handleModalSetRes = () => setOpenModal2(!openModal2);

  return (
    <Modal
      show={modalOpen}
      size="7xl"
      className="bg-black"
      onClose={closeModal}
    >
      <AgregarResProd
        openModal2={openModal2}
        handleModalSet2={handleModalSetRes}
        productonombre={item.nombre}
        serial={item.serial}
      />

      <Modal.Header className="bg-azulC dark:bg-woodsmoke">
        {item.nombre}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6 bg-white">
          <div className="bg-azul dark:bg-azulO rounded-lg p-4 mx-4 mt-4 sm:mx-28 border dark:border-azulC border-azulO">
            <h2 className="text-white text-3xl font-bold text-center">
              {item.nombre}
            </h2>
          </div>
          <div className="flex justify-center">
            <img
              className="w-512 h-auto rounded-xl bg-azulO"
              src={item.imagen}
              alt="Articulo_image"
            />
          </div>
          <div className="border dark:border-azulC border-azulO p-4 mx-2 mt-2 sm:mx-10">
            <div className="flex justify-between items-center mb-6">
              <p className="text-4xl font-bold text-black dark:text-black ">
                ${item.precio}
              </p>
              <p className="text-xl text-black dark:text-black">
                Cantidad: {item.cantidad}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-black dark:text-black mb-6">
              Descripción: {item.descripcion}
            </p>
            <p className="text-lg text-black dark:text-black">
              Categoría: {item.categoria}
            </p>
          </div>
          {/* Hide the "Agregar Reseña" button if the user is not logged in */}
          {loggedIn ? (
            <button
              onClick={handleModalSetRes}
              className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
            >
              Agregar Reseña
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold text-center text-red-500">
                Si deseas reseñar el producto,{" "}
                <span className="bg-yellow-200">inicia sesión</span>, y deja tu
                reseña.
              </p>
              <Link
                to={"/Login"}
                className="inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulOmr-4 mt-4"
              >
                <div className="rounded-md  px-3 py-2 text-white font-bold items-center justify-center">
                  Inicio de Sesión
                </div>
              </Link>
            </div>
          )}
          <ResProdComm serial={item.serial}></ResProdComm>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-azulC dark:bg-woodsmoke">
        <Button
          className="bg-azulO hover:bg-azulW text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
