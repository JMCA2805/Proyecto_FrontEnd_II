import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleModal from './ArticleModal';
import { FaSadCry } from 'react-icons/fa';

const API = import.meta.env.VITE_GETART_URL;

export default function Article() {
  const [articulos, setArticulos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticulo, setSelectedArticulo] = useState(null);

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setArticulos(response.data);
        } else {
          setArticulos([]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const openModal = (articulo) => {
    setSelectedArticulo(articulo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      {articulos.length > 0 ? (
        articulos.map((articulo) => (
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
                <p>{truncateText(articulo.texto, 300)}</p>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => openModal(articulo)}
            >
              Ver más
            </button>
          </div>
        ))
      ) : (
        <div
          className="my-20 mx-20 flex flex-col items-center justify-center h-full bg-white text-black rounded-lg shadow-lg p-10"

        >
          <FaSadCry size="200" color="blue" />
          <h2 className=' my-8 text-4xl tracking-tight font-extrabold text-black dark:text-black text-center' >No hay artículos registrados en el sistema</h2>
        </div>
      )}
      <ArticleModal
        articulo={selectedArticulo}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />
    </>
  );
}