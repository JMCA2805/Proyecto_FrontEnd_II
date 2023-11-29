import UserTable from "./TablaUsers";
import TablaProductos from "./TablaProductos";
import TablaOffers from "./Tablaoffers";
import TablaArt from "./TablaArt";
import { useState } from "react";

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
            className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
              showTablaArt ? "border-azulO" : "border-azul"
            } dark:border-azulO/70 ${
              showTablaArt ? "hover:bg-azulC" : "hover:bg-azul"
            } focus-within:bg-azulO`}
            onClick={() => {
              setShowTablaArt(!showTablaArt);
              setShowTablaOffers(false);
              setShowUserTable(false);
              setShowTablaProductos(false);
            }}
          >
            Mostrar/ocultar TablaArt
          </button>
          <button
            className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
              showTablaOffers ? "border-azulO" : "border-azul"
            } dark:border-azulO/70 ${
              showTablaOffers ? "hover:bg-azulC" : "hover:bg-azul"
            } focus-within:bg-azulO`}
            onClick={() => {
              setShowTablaOffers(!showTablaOffers);
              setShowTablaArt(false);
              setShowUserTable(false);
              setShowTablaProductos(false);
            }}
          >
            Mostrar/ocultar TablaOffers
          </button>
          <button
            className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
              showUserTable ? "border-azulO" : "border-azul"
            } dark:border-azulO/70 ${
              showUserTable ? "hover:bg-azulC" : "hover:bg-azul"
            } focus-within:bg-azulO`}
            onClick={() => {
              setShowUserTable(!showUserTable);
              setShowTablaArt(false);
              setShowTablaOffers(false);
              setShowTablaProductos(false);
            }}
          >
            Mostrar/ocultar UserTable
          </button>
          <button
            className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
              showTablaProductos ? "border-azulO" : "border-azul"
            } dark:border-azulO/70 ${
              showTablaProductos ? "hover:bg-azulC" : "hover:bg-azul"
            } focus-within:bg-azulO`}
            onClick={() => {
              setShowTablaProductos(!showTablaProductos);
              setShowTablaArt(false);
              setShowTablaOffers(false);
              setShowUserTable(false);
            }}
          >
            Mostrar/ocultar TablaProductos
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
