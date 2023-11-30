import UserTable from "./TablaUsers";
import TablaProductos from "./TablaProductos";
import TablaOffers from "./Tablaoffers";
import TablaArt from "./TablaArt";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IconContext } from "react-icons";

export default function MenuAdmin() {
  const [showTablaArt, setShowTablaArt] = useState(false);
  const [showTablaOffers, setShowTablaOffers] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);
  const [showTablaProductos, setShowTablaProductos] = useState(false);
  return (
    <>
      <div className="flex justify-center mb-4 mt-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            className="block p-2 md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
            onClick={() => {
              setShowTablaArt(!showTablaArt);
              setShowTablaOffers(false);
              setShowUserTable(false);
              setShowTablaProductos(false);
            }}
          >
            <IconContext.Provider
              value={{
                color: "white",
                size: "20px",
                className: "w-auto h-auto p-0 m-0",
              }}
            >
              <div className="flex gap-2">
                <span>Tabla de Artículos</span>
                {showTablaArt ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </IconContext.Provider>
          </button>
          <button
            className="block p-2 md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
            onClick={() => {
              setShowTablaOffers(!showTablaOffers);
              setShowTablaArt(false);
              setShowUserTable(false);
              setShowTablaProductos(false);
            }}
          >
            <IconContext.Provider
              value={{
                color: "white",
                size: "20px",
                className: "w-auto h-auto p-0 m-0",
              }}
            >
              <div className="flex gap-2">
                <span>Tabla de Ofertas</span>
                {showTablaOffers ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </IconContext.Provider>
          </button>
          <button
            className="block p-2 md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
            onClick={() => {
              setShowUserTable(!showUserTable);
              setShowTablaArt(false);
              setShowTablaOffers(false);
              setShowTablaProductos(false);
            }}
          >
            <IconContext.Provider
              value={{
                color: "white",
                size: "20px",
                className: "w-auto h-auto p-0 m-0",
              }}
            >
              <div className="flex gap-2">
                <span>Tabla de Usuarios</span>
                {showUserTable ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </IconContext.Provider>
          </button>
          <button
            className="block p-2 md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
            onClick={() => {
              setShowTablaProductos(!showTablaProductos);
              setShowTablaArt(false);
              setShowTablaOffers(false);
              setShowUserTable(false);
            }}
          >
            <IconContext.Provider
              value={{
                color: "white",
                size: "20px",
                className: "w-auto h-auto p-0 m-0",
              }}
            >
              <div className="flex gap-2">
                <span>Tabla de Productos</span>
                {showTablaProductos ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </IconContext.Provider>
          </button>
        </div>
      </div>
      <div>
        {showTablaArt && <TablaArt />}
        {showTablaOffers && <TablaOffers />}
        {showUserTable && <UserTable />}
        {showTablaProductos && <TablaProductos />}
      </div>
    </>
  );
}
