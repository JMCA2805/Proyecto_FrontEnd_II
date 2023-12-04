import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Footer = () => {
  const location = useLocation();
  const isTokenPresent = document.cookie.includes("token=");
  const { user } = useContext(AuthContext);

  return (
    <div className="mt-auto overflow-hidden">
      <footer className="px-4 bg-azulC md:px-8 lg:px-10 border-t border-gray-200 dark:border-azul/80 dark:bg-black font-poppins">
        <div className="mx-auto max-w-screen-xl text-center font-bold">
          {/* Logo */}
          <a
            href="#"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="h-44 inline  py-4"
              src="/WebStore Wonderland.png"
              alt="WebStore Wonderland"
            />
          </a>
          {/* Descripción */}
          <p className="mb-6 text-white dark:text-gray-400">
            Tu sitio favorito de compras tecnológicas e información.
          </p>
          {/* Enlaces */}
          <ul className="flex flex-wrap justify-center items-center mb-6 text-white dark:text-white space-x-4 md:space-x-6">
            {/* Utilizar la clase space-x-6 */}
            <li>
              <Link to="/" className="hover:underline hover:text-azul">
                Inicio
              </Link>{" "}
            </li>
            {!isTokenPresent && (
              <>
                <li>
                  <Link
                    to="/Registro"
                    className="hover:underline hover:text-azul"
                  >
                    Registro
                  </Link>
                </li>
                <li>
                  <Link to="/Login" className="hover:underline hover:text-azul">
                    Login
                  </Link>
                </li>
              </>
            )}
            {isTokenPresent && user?.rol === "admin" && (
              <>
                <li>
                  <Link to="/Blog" className="hover:underline hover:text-azul">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Admin"
                    className={`hover:underline hover:text-azul ${
                      location.pathname === "/Registro" ? "hidden" : ""
                    }`}
                  >
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* Derechos de autor */}
          <span className="text-sm text-white sm:text-center dark:text-gray-400">
            WebStore Wonderland © 2023 All Rights Reserved
            <a href="#" className="hover:underline">
              {" "}
              - JMLJY™
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
