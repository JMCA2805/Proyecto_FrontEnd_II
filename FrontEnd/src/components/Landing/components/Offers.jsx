import axios from "axios";
import React, { useEffect, useState } from "react";

// Api del servidor backend
const API = import.meta.env.VITE_GETOFF_URL;

export default function Offers() {
  // Estados
  const [ofertas, setOfertas] = useState("");

  const getoffers = () => {
    // Lógica para obtener los datos de las ofertas desde el backend
    axios
      .get(API)
      .then((response) => {
        setOfertas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getoffers();
  }, []);

  return (
    <section className="flex h-full font-poppins bg-white dark:bg-black rounded-lg m-4 dark:border-2 dark:border-azulO shadow-lg shadow-azulO/50 dark:shadow-none">
      <div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-full bg-azulO rounded-t-lg py-4 flex justify-center items-center ">
            <h2 className="text-4xl tracking-tight font-extrabold text-white dark:text-azulW text-center ">
              Ofertas y Descuentos
            </h2>
          </div>
          <p className="text-azulO sm:text-xl dark:text-gray-400 text-justify md:p-8 p-4">
            En WebStore Wonderland, nuestro objetivo es garantizar que nuestros
            clientes encuentren los mejores productos tecnológicos a los mejores
            precios. Por eso, ofrecemos una amplia variedad de ofertas y
            descuentos para que puedas ahorrar en tu próxima compra.
          </p>
        </div>
        {ofertas != "" ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 md:pb-8 pb-4">
            {/* Seccion que muestra y condiciona si mostrar o no os ofertas */}
            {ofertas.map((off, index) => (
              <div key={index} className="flex flex-col items-center px-6">
                <div className="flex justify-center items-center mb-2 w-10 h-10 rounded-full lg:h-12 lg:w-12 ">
                  <img
                    src={off.imagen}
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white text-azulO text-center">
                  {off.oferta}
                </h3>
                <p className="text-azulO dark:text-gray-400 text-justify">
                  {off.descripcion}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
