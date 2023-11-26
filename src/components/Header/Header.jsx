// HeaderPrueba.jsx
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Loader from "./Loader";
import { IconContext } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDark } from "../../contexts/DarkModeProvider";
import { Link } from "react-router-dom";

function Header() {
  // Estados del componente menu
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // Funcion de visibilidad del loader
  const toggleLVisibility = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  //Modo Oscuro y Claro
  const { theme, setTheme } = useDark();
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  // Funcion de cambio de tema
  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    // Barra de navegacion
    <nav className="bg-white dark:bg-black">
      <div className="w-full flex items-center justify-center h-16 px-4 shadow-lg font-poppins dark:border-b dark:border-azul/80">
        <div className="w-full">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex font-extrabold text-azulO dark:text-azulW md:text-2xl text-md"
          >
            <div className="flex justify-center items-center">
              <img
                className="md:h-12 h-10 hover:cursor-pointer"
                src="/WebStore Wonderland.png"
                alt="WebStore Wonderland"
              />
            </div>

            <span className="flex px-2 justify-center items-center md:w-auto w-28">WebStore Wonderland</span>
          </Link>
        </div>

        <div className="flex gap-2 h-full justify-end items-center md:w-full">
          {/* Menu */}
          <div className="hidden md:block">
            <Menu toggleLVisibility={toggleLVisibility} />
          </div>

          {/* Botón de DarkMode */}
          <div className="rounded-full text-azulW bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO h-10 w-10 ">
            <IconContext.Provider
              value={{
                color: "white",
                size: "20px",
                className: "w-auto h-auto p-0 m-0",
              }}
            >
              <button
                onClick={handleChangeTheme}
                className="flex justify-center items-center w-full h-full rounded-full"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </IconContext.Provider>
          </div>
        </div>

        {/*Menu desplegable movil*/}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full transition duration-150 ease-in-out ml-2 text-azulW bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="md:hidden">
        {showMobileMenu && <Menu toggleLVisibility={toggleLVisibility} />}
      </div>

      {/* Loaders*/}
      {loading && <Loader />}
    </nav>
  );
}

export default Header;
