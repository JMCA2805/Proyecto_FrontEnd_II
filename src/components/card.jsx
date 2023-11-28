import React,{useState, useEffect, useContext} from "react";
import { FaHeart, FaShoppingCart} from 'react-icons/fa';
import axios from "axios";

import ProductModal from './ModalProducts';
import { AuthContext } from "../contexts/AuthProvider";
import CartButton from "./cartButton";

const API = import.meta.env.VITE_PRODUCTS_URL;

const Card = () => {
  const [addedToCart, setAddedToCart] = useState({});



   const { user } = useContext(AuthContext);
   const [items, setItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [modalOpen, setModalOpen] = useState(false);
   const [filtro, setFiltro] = useState('Nombre');
   const [buscarText, setBuscar] = useState('');
   const [buscarButton, setButton] = useState('Buscar');
   const [categoria, setCategoria] = useState('Computadoras');

   const [selectedItem, setSelectedItem] = useState(null);


   const productsPerPage = 6;
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);
 
   const handleOpenCreate = () => {
     // Función para abrir el formulario de creación
   };

   const handleAddToCart = async (serial, nombre, descripcion, precio) => {
    try {
      if (addedToCart[serial]) {
        await axios.post(`${API}/${user.id}`, {
          serial,
          nombre,
          descripcion,
          precio,
          accion: "eliminar"
        });
  
        setAddedToCart((prevState) => ({
          ...prevState,
          [serial]: false
        }));
      } else {
        await axios.post(`${API}/${user.id}`, {
          serial,
          nombre,
          descripcion,
          precio,
          accion: "agregar"
        });
  
        setAddedToCart((prevState) => ({
          ...prevState,
          [serial]: true
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
 
   const handlePreviousPage = () => {
     setCurrentPage(currentPage - 1);
   };
 
   const handleNextPage = () => {
     setCurrentPage(currentPage + 1);
   };

   const openModal = item => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const buscarPost = async (e) => {
    e.preventDefault();

    const buscar = {
      busqueda: buscarText,
      nombreBoton: buscarButton,
      filtro: filtro,
      categoria: categoria
    };


    try {
      const response = await axios.post(API, buscar);

      setItems(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(user);
  
    const fetchCartStatus = async () => {
      try {
        const response = await axios.get(API, {
          withCredentials: true
        });
  
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          setItems([]);
        }
  
        // Mapear los datos de la respuesta para obtener el estado de cada producto
        const cartStatus = response.data;
        const initialAddedToCart = cartStatus.reduce((acc, item) => {
          acc[item.serial] = item.carrito;
          return acc;
        }, {});
  
        setAddedToCart(initialAddedToCart);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchCartStatus();
  }, [user.id]);
 
   return (
     <>
      <div className='pb-8'>
            <form className='flex flex-col gap-2' method='POST' onSubmit={buscarPost}>

            <label className='flex gap-2 items-center'>
              Filtrar Por:
              <select
                value={filtro}
                className="rounded-lg"
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="Nombre">Nombre</option>
                <option value="Categoria">Categoria</option>
              </select>
            </label>
            
            <div className='flex gap-2'>

            {filtro === 'Categoria' ? (
              <select
                value={categoria}
                className=" w-full rounded-lg"
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Computadoras">Computadoras</option>
                <option value="Laptops">Laptops</option>
                <option value="Perifericos">Periféricos</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Telefonos">Teléfonos</option>
              </select>
            ) : (
              <input
                type="text"
                value={buscarText}
                className="w-full rounded-lg"
                onChange={(e) => setBuscar(e.target.value)}
              />
            )}
    
              <button
                  type="submit"
                  value={buscarButton}
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-verdeo hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onChange={(e) => setButton(parseFloat(e.target.value))}
                >
                  Buscar
                </button>

            </div>


            </form>
        </div>
 
       {items.length === 0 ? (
         <div className="w-full h-96 flex justify-center items-center">
           <h1 className="text-5xl font-bold text-black dark:text-pizazz ssm:text-xl px-12">
             No hay artículos disponibles
           </h1>
         </div>
       ) : (
         <>
            <div className="container mx-auto mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
             {currentProducts.map((item) => (
               <div
                 key={item.serial}
                 id={item.serial}
                 className="border-2 border-azulC xl:hover:-translate-y-1 xl:hover:ease-in xl:hover:duration-300 xl:hover:dark:bg-black relative z-0 dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40 p-4 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2"
               >
                  <div className="flex justify-end space-x-1">
                     <div className="pt-1 pr-1 pl-1 border-2 border-azulC rounded-full  dark:border-white " >
                     <button
                        onClick={() =>
                          handleAddToCart(item.serial, item.nombre, item.descripcion, item.precio)
                        }
                        className={addedToCart[item.serial] ? "btn-amarrillo" : "btn-blanco"}
                      >
                        {addedToCart[item.serial] ? (
                          <FaShoppingCart className="text-green-500 dark:text-green-500" />
                        ) : (
                          <FaShoppingCart className="text-azulC dark:text-white" />
                        )}
                      </button>
                        </div>
                           <div className="pt-1 pr-1 pl-1 border-2 border-azulC rounded-full  dark:border-white">
                              <button>
                                 <FaHeart className="text-azulC dark:text-white" />
                              </button>
                        </div>
                  </div>

                  <div
                     className={
                        " flex items-center justify-center w-full border-b border-pizazz/30 bg-white-smoke rounded-t-lg dark:bg-woodsmoke"
                     }
                  >
                     <img
                        className="p-8 rounded-t-lg h-96"
                        src={`${item.imagen}`}
                        alt={`Imagen de ${item.nombre}`}
                     />
                  </div>

                  <div className="h-40 py-2 ssm:h-32">
                     <div className="w-full px-2 group flex relative justify-center items-center">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                           {item.nombre}
                        </h5>
                        <span className="border-azulC absolute flex text-center -top-8 scale-0 rounded bg-white dark:bg-black p-2 text-xs text-black dark:text-white group-hover:scale-100 border border-pizazz/30">
                           {item.nombre}
                        </span>
                     </div>

                     <div className="flex flex-col justify-center py-1">
                        <div className="flex text-xs">
                           <span className="text-xs font-bold">Descripción: </span>
                           <span className="font-normal text-center ml-1 ">
                              {item.descripcion}
                           </span>
                        </div>
                        <div className="flex text-xs">
                           <span className="text-xs font-bold">Cantidad:</span>
                           <span className="font-normal text-center ml-1  ">
                              {item.cantidad}
                           </span>
                        </div>


                        <div className="flex text-xs">
                           <span className="text-xs font-bold">Categoria:</span>
                           <span className="font-normal text-center ml-1 ">
                              {item.categoria}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-between">
                     <div> <span className="font-bold text-2xl mb-2">
                        ${item.precio}
                     </span></div>
                     <div>
                     <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => openModal(item)}
            >
              Ver más
            </button>
                     </div>

                     </div>
               </div>
             ))}
             <ProductModal
        item={selectedItem}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />
           </div>
 
           <div className="flex flex-col gap-2 items-center mt-5">
             <div className="flex gap-2">
               <button
                 onClick={handlePreviousPage}
                 disabled={currentPage === 1}
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
         
               >
                 Anterior
               </button>
               <button
                 onClick={handleNextPage}
                 disabled={currentPage === Math.ceil(items.length / productsPerPage)}
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                 
               >
                 Siguiente
               </button>
             </div>
 
             <p className="text-gray-600 text-sm dark:text-white">
               Página {currentPage} de {Math.ceil(items.length / productsPerPage)}
             </p>
           </div>
           </div>
         </>
       )}
     </>
   );
 }
 
 export default Card;