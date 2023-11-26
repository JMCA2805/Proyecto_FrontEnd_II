import { useMatch } from "react-router-dom";

function Card() {
  const match = useMatch("/");
  const match2 = useMatch("/Home");
  const match3 = useMatch("/Login");



  const formatDate = (dateString) => {
    let fecha = new Date(dateString);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    let año = fecha.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    return dia + "-" + mes + "-" + año;
  };

  const items = [
    {
        "_id": "1",
        "titulo": "Producto 1",
        "marca": "Marca 1",
        "modelo": "Modelo 1",
        "category": "Categoría 1",
        "imagen": "url_de_la_imagen_1",
        "favorito": false,
        "cantidad": 10
    },
    {
        "_id": "2",
        "titulo": "Producto 2",
        "marca": "Marca 2",
        "modelo": "Modelo 2",
        "category": "Categoría 2",
        "imagen": "url_de_la_imagen_2",
        "favorito": true,
        "cantidad": 0
    }
];

 const favorito = (itemId) => {
    const fav = { favorito: !items.find((item) => item._id === itemId).favorito };

    fetch(`http://localhost:4000/favoritos/${user.userId}/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(fav),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
 };

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
          {!match3 ? (
            <>
              <div className="w-full h-12 px-12 ssm:p-4 pt-5 grid grid-cols-5 ssm:grid-cols-2 md:grid-cols-3 justify-end pr-12 gap-4 ">
                <select
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                  }}
                  name="filter_categoria"
                  id="filter_categoria"
                  className="p-1 w-full border focus:outline-none rounded-lg border-pizazz/40 h-10 dark:text-white text-black bg-transparent dark:placeholder-white placeholder-gray dark:focus:border-dark-tangerine focus:border-blaze-orange bg-white dark:bg-black"
                >
                  <option value={false}>Seleccione la categoría</option>
                </select>
              </div>
            </>
          ) : null}
          <div className="grid grid-cols-5 gap-4 p-12 pt-6 md:grid-cols-3 ssm:grid-cols-2 ssm:p-4">
            {items.map((item) =>
              item.cantidad == 0 &&   (
                <div
                  key={item._id}
                  id={item._id}
                  className={
                    "xl:hover:-translate-y-6 xl:hover:scale-105 xl:hover:ease-in xl:hover:duration-300 xl:hover:dark:bg-black relative z-0 dark:text-white dark:bg-black/30 bg-white rounded-lg shadow-lg overflow-hidden w-full border border-pizazz/40  p-4 ssm:h-80 hover:shadow-xl hover:border-dark-tangerine hover:border-2 " +
                    (match2 && user.rol == "Admin" ? "h-96" : "h-80")
                  }
                > 
                  {match2 && user.rol == "User" ? (
                    <>
                      <button className="absolute w-10 h-10 right-0 top-0 dark:bg-transparent bg-white rounded-full hover:border-2 hover:border-dark-tangerine"
                      onClick={() => 
                      favorito(item._id)}
                      >
                      {item.favorito}
                        {/* Centra la imagen */}
                        <img
                          className="h-full p-1"
                          src="src\assets\icons\star-regular-240.png"
                          alt="Estrella"
                        />
                      </button>
                    </>
                  ) : null}
                  <div
                    className={
                      "flex items-center justify-center w-full border-b border-pizazz/30 bg-white-smoke rounded-t-lg dark:bg-woodsmoke " +
                      (match2 && user.rol == "Admin" ? "h-2/5 " : "h-2/4")
                    }
                  >
                    {/* Centra la imagen */}
                    <img
                      className="h-full p-2"
                      src={`${item.imagen}`}
                      alt={`Imagen de ${item.titulo}`}
                    />
                  </div>
                  <div className="h-40 py-2 ssm:h-32">
                    <div className="w-full px-2 group flex relative justify-center items-center">
                      <h1 className="text-center text-base font-bold ssm:text-xs truncate h-full overflow-hidden">
                        {item.titulo}
                      </h1>
                      <span className="absolute flex text-center -top-8 scale-0 rounded bg-white dark:bg-black p-2 text-xs text-black dark:text-white group-hover:scale-100 border border-pizazz/30">
                        {item.titulo}
                      </span>
                    </div>
                    {/* Agrega el título del ítem centrado debajo de la imagen */}
                    <div className="flex flex-col justify-center py-1">
                      <div className="flex text-xs">
                        <span className="text-xs font-bold">Marca: </span>
                        <span className="font-normal text-center ml-1 ">
                          {item.marca}
                        </span>
                      </div>
                      <div className="flex text-xs">
                        <span className="text-xs font-bold">Modelo:</span>
                        <span className="font-normal text-center ml-1  ">
                          {item.modelo}
                        </span>
                      </div>
                      <div className="flex text-xs">
                        <span className="text-xs font-bold">Categoría:</span>
                        <span className="font-normal text-center ml-1  ">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex text-xs">
                        <span className="text-xs font-bold">Cantidad:</span>
                        <span className="font-normal text-center ml-1 ">
                          {item.cantidad}
                        </span>
                      </div>
                      <div className="flex text-xs">
                        <span className="text-xs font-bold">Precio:</span>
                        <span className="font-normal text-center ml-1 ">
                          {item.precio_adquisicion + "$"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-xs font-bold">Fecha:</span>
                        <span className="font-normal text-center ml-1  text-xs">
                          {formatDate(item.fecha_adquisicion)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {match2 && user.rol == "Admin" ? (
                    <div className="flex text-white gap-2 xl:gap-6 items-center justify-center">
                      {/* Boton para abrir el Modal */}
                      <Button
                        handleOpen={async () => {
                          handleOpenEdit();
                          setItem(item);
                          setImage(item.image);
                          setTitulo(item.titulo);
                          setMarca(item.marca);
                          setModelo(item.modelo);
                          setCategory(item.category);
                          setCantidad(item.cantidad);
                          setPrecio(item.precio_adquisicion);
                          setFecha(item.fecha_adquisicion);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        handleOpen={() => {
                          setItem(item);
                          handleOpenDel();
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ) : null}
                </div>
              )
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Card;
