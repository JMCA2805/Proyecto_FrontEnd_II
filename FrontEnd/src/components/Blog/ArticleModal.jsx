import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState, useContext } from "react";
import ResArtComm from "./ResArtComm"
import AgregarResArt from './AddResBlog';
import {AuthContext} from "../../contexts/AuthProvider"
import { Link } from "react-router-dom";



function ArticleModal({ articulo, modalOpen, closeModal }) {
  if (!articulo) {
    return null;
  }

  const { loggedIn } = useContext(AuthContext); // Access `loggedIn` state from the context
  const [openModal2, setOpenModal2] = useState(false);
  const handleModalSetRes = () => setOpenModal2(!openModal2);

  return (
    <Modal show={modalOpen} size="6xl" className='bg-black' onClose={closeModal}>
      <Modal.Header className="bg-azulC dark:bg-woodsmoke">{articulo.titulo}</Modal.Header>
      <Modal.Body>
      <AgregarResArt
        openModal2={openModal2}
        handleModalSet2={handleModalSetRes}
        articulo = {articulo}
      />
        <div className="space-y-6 p-6 bg-white ">
          <img
            className="w-full rounded-2xl"
            src={articulo.imagen}
            alt="Articulo_image"
          />
          <p className="text-base leading-relaxed text-black dark:text-black">
            {articulo.texto}
          </p>
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
            <ResArtComm titulo={articulo.titulo}></ResArtComm>

        </div>

      </Modal.Body>
      <Modal.Footer className="bg-azulC dark:bg-woodsmoke">
        <Button className="bg-azulO hover:bg-azulW text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ArticleModal;