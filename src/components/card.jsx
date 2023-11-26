import { useMatch } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaCreditCard  } from 'react-icons/fa';
import imagen1 from 'C:/Proyecto/Proyecto_FrontEnd_II/public/001.png';
function Card() {
  const items = [
    {
        "_id": "1",
        "serial": "25485140005",
        "nombre": "Laptop Go",
        "descripcion": "Microsoft 12.4",
        "cantidad": 5,
        "precio": 200,
        "categoria": "Laptops",
        "imagen": imagen1
    },
    {
        "_id": "2",
        "serial": "25485140005",
        "nombre": "Laptop Go",
        "descripcion": "Modelo 2",
        "cantidad": 5,
        "precio": 200,
        "categoria": "Laptops",
        "imagen": imagen1
    }
];



  return (
    <>
      {items.length == 0 ? (
        <>
          {" "}
          <div className="w-full h-96 flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-black dark:text-pizazz ssm:text-xl px-12">
              No hay artículos disponibles
            </h1>
          </div>
        </>
      ) : (
        <>
         
          <div className="w-2/3 grid grid-cols-5 gap-4 p-12 pt-6 md:grid-cols-3 ssm:grid-cols-2 ssm:p-4">
            {items.map((item) =>
                <div
                  key={item._id}
                  id={item._id}
                  className={
                    "border-2 border-azulC xl:hover:-translate-y-6 xl:hover:scale-105 xl:hover:ease-in xl:hover:duration-300 xl:hover:dark:bg-black relative z-0 dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40  p-4 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2"
                  }
                > 


<div className="flex justify-end space-x-1">
  <div className="pt-1 pr-1 pl-1 border-2 border-azulC rounded-full  dark:border-white " > 
    <button>
      <FaShoppingCart className="text-azulC dark:text-white" />
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
                    {/* Centra la imagen */}
                    <img
                      className="h-full p-2"
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
                    {/* Agrega el título del ítem centrado debajo de la imagen */}
                    <div className="flex flex-col justify-center py-1">
                      <div className="flex text-xs">
                        <span className="text-xs font-bold">Serial: </span>
                        <span className="font-normal text-center ml-1 ">
                          {item.serial}
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
                    <button type="button" className="w-auto text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 dark:text-white">
                 Comprar<FaCreditCard />
</button>
                    </div>
               
                 </div>
                   
          
                </div>
            
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Card;
