import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

export default function Hero() {
  const { loggedIn } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);

  return (
    <>
      <section className="bg-[url('/Hero.jpg')] bg-cover bg-center dark:bg-gray-900 font-poppins bg-fixed sm:bg-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          {/* Contenido principal */}
          <div className="mr-auto place-self-center lg:col-span-7">
            {/* Título */}
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight text-white leading-none md:text-5xl xl:text-7xl dark:text-white">
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
                  >
                    <div className="flex rounded-md w-full h-full px-3 py-2 text-white font-bold">
                      Comprar
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
