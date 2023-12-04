import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import AddReviews from "../../Reviews/AddReviews";

export default function Hero() {
  const { loggedIn } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);

  return (
    <>
      <AddReviews openModal={openModal} handleModalSet={handleModalSet} />
      <section className="bg-[url('/Hero.jpg')] bg-cover bg-center dark:bg-gray-900 font-poppins bg-fixed sm:bg-center">
        <div className="px-8 py-8 mx-auto lg:py-16">
          {/* Contenido principal */}
          <div className="md:w-1/2 2xl:w-full">
            {/* Título */}
            <h1 className="w-2xl 2xl:w-full mb-4 text-4xl font-extrabold tracking-tight text-white leading-none md:text-5xl xl:text-7xl dark:text-white">
              WebStore Wonderland
            </h1>
            {/* Descripción */}
            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-1xl dark:text-white">
              Te invitamos a descubrir el mundo de la tecnología en nuestra
              tienda. ¡Regístrate y obtén un 15% de descuento en tu primera
              compra!
            </p>
            {/* Botones */}

            {loggedIn && (
              <>
                <div className="gap-8 flex">
                  <Link
                    to={"/"}
                    className="inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                    onClick={handleModalSet}
                  >
                    <div className="flex rounded-md w-full h-full px-3 py-2 text-white font-bold">
                      Reseñar
                    </div>
                  </Link>
                </div>
              </>
            )}

            {!loggedIn && (
              <>
                <div className="gap-8 flex">
                  <Link
                    to={"/Login"}
                    className="inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulOmr-4 "
                  >
                    <div className="flex rounded-md w-full h-full px-3 py-2 text-white font-bold">
                      Login
                    </div>
                  </Link>
                  <Link
                    to={"/Registro"}
                    className="inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                  >
                    <div className="flex rounded-md w-full h-full px-3 py-2 text-white font-bold">
                      Registro
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
