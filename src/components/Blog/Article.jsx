import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_GETART_URL;

export default function Article() {
  const [articulos, setArticulos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticulo, setSelectedArticulo] = useState(null);

  useEffect(() => {
    axios
      .get(API)
      .then(response => {
        if (Array.isArray(response.data)) {
          setArticulos(response.data);
        } else {
          setArticulos([]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const openModal = articulo => {
    setSelectedArticulo(articulo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {articulos.map(articulo => (
        <div
          className="sm:p-10 p-4 md:p-4 flex w-full flex-col md:flex-row h-full  font-poppins border dark:border dark:border-azulC  border-azulO bg-azulW dark:bg-woodsmoke text-black dark:text-white rounded-2xl md:gap-0 gap-8 mb-4"
          key={articulo.id}
        >
          <div className="w-full md:w-1/3 items-center flex">
            <img
              className="w-full rounded-2xl"
              src={articulo.imagen}
              alt="Articulo_image"
            />
          </div>
          <div className="w-full md:w-2/3 md:mx-4 rounded-2xl border border-azulO dark:border-azulC p-2">
            <div className="w-full flex justify-center xl:text-3xl lg:text-2xl md:text-lg font-bold text-base px-4">
              <h2>{articulo.titulo}</h2>
            </div>
            <div className="w-full mt-4 px-4 xl:text-lg min-[1024px]:text-sm min-[1200px]:text-base md:text-[10px] text-[11px]">
              <p>{articulo.texto}</p>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => openModal(articulo)}
            >
              Ver más
            </button>
          </div>
        </div>
      ))}

{selectedArticulo && (
  <div
    id="medium-modal"
    tabIndex="-1"
    className={`sticky top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
      modalOpen ? 'block' : 'hidden'
    }`}
  >
    <div className="w-full max-w-lg max-h-full">
      <div className="bg-azulC rounded-lg shadow dark:bg-azulO">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-azulC">
          <h3 className="text-xl font-medium text-white dark:text-white">
            {selectedArticulo.titulo}
          </h3>
          <button
            type="button"
            className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="medium-modal"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <p className="text-base leading-relaxed text-white">
            {selectedArticulo.texto}
          </p>
          <img
            className="w-full rounded-2xl"
            src={selectedArticulo.imagen}
            alt="Articulo_image"
          />
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}