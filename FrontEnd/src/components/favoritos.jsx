import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartContext"; // Importa CartContext
import { FaTrash } from 'react-icons/fa';
import Swal from "sweetalert2";
const Favoritos = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);
  const { addedToFav, setAddedToFav } = useContext(CartContext); // Usa useContext para acceder a addedToFav y setAddedToFav
  const API_FAV = import.meta.env.VITE_URL_ADD_FAV;

  useEffect(() => {
    fetch(`${API_FAV}/${user.id}`) // Asegúrate de que esta sea la URL correcta
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error("Error:", error));
  }, []);

  const handleRemoveFromFav = async (serial) => {
    const response = await fetch(
       `${API_FAV}?id_prod=${serial}`,
       {
          method: "DELETE",
       }
    );
    const data = await response.json();

     // Actualiza el estado addedToFav para este artículo
        setAddedToFav(prevState => ({ ...prevState, [serial]: false }));
        Swal.fire({
           icon: "success",
           title: "Producto eliminado de favoritos",
           text: `El producto ${serial} ha sido eliminado de favoritos.`,
           confirmButtonText: "Aceptar",
        }).then((result) => {
           if (result.isConfirmed) {
              //cuando el usuario presione "Aceptar"
           }
        });
        return updatedState;

  };

  return (
    <>
      {items.length > 0 ? (
        <div className="mt-2 overflow-x-auto  shadow rounded-xl overflow-hidden h-full dark:border-azulC border border-azulO">
          <table className="w-full leading-normal text-xs md:text-sm text-left">
            <thead className="text-white bg-azul dark:bg-azulO border-b dark:border-azulC border-azulO">
              <tr className="text-center">
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Eliminar
                </th>
                <th scope="col" className="sm:p-2 md:px-6 md:py-3 text-center">
                  Favoritos
                </th>
              </tr>
            </thead>
            <tbody className="bg-azulW dark:bg-black/50 text-azulO dark:text-white">
              {items.map((producto) => (
                <tr
                  key={producto.usuario}
                  id={producto.usuario}
                  className="border-b dark:border-azulC border-azulO"
                >
                  <td className="p-2 md:px-6 md:py-3 text-center">
                    <button onClick={() => handleRemoveFromFav(producto.id_prod)} className="text-azulO font-bold py-2 px-4 rounded">
                      <FaTrash />
                    </button>
                  </td>
                  <td className="p-2 md:px-6 md:py-3 text-center">
                    {producto.producto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No se encontraron Favoritos.
        </div>
      )}
    </>
  );
};

export default Favoritos;
