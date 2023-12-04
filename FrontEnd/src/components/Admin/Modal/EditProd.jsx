// Importaciones
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import * as yup from "yup";

// Api del backend para la solicitud
const API = import.meta.env.VITE_PRODUCTS_URL;

const schema = yup.object().shape({
  cantidad: yup
    .number()
    .positive("La cantidad debe ser mayor que cero."),
  precio: yup
    .number()
    .positive("El precio debe ser mayor que cero.")
});


//Props
export default function EditProd({
  openEditModal,
  handleEditModalSet,
  productoSeleccionado,
  setProductoSeleccionado,
  setDatosActualizados,
  handleInputChange,
  datosActualizados,
  handleUp,
}) {
  // Inicializacion de estados
  const [imagen, setImagen] = useState("");

  const actualizarProducto = (event) => {
    event.preventDefault(); // Evita que la página se reinicie por defecto

    // Check if the cantidad field is empty, and convert it to 0 if it is
 

    const formData = new FormData();
    formData.append("serialviejo", productoSeleccionado.serial)
    formData.append("serial", datosActualizados.serial);
    formData.append("nombre", datosActualizados.nombre);
    formData.append("descripcion", datosActualizados.descripcion);
    formData.append("cantidad", datosActualizados.cantidad);
    formData.append("precio", datosActualizados.precio);
    formData.append("categoria",datosActualizados.categoria);
    formData.append("imagen", imagen);

    console.log(datosActualizados.serial)
    console.log(productoSeleccionado.serial)


    schema
    .validate({
      cantidad: datosActualizados.cantidad,
      precio: datosActualizados.precio,
    })
    .then(() => {
      axios
        .put(API, formData)
        .then((response) => {
          // Obtener la URL de la imagen actualizada del cuerpo de la respuesta

          const imagenActualizada = response.data.imagen;

          setProductoSeleccionado(null);
          setDatosActualizados({});
          handleUp();

          // Mensaje de confirmación
          Swal.fire({
            icon: "success",
            title: "Producto actualizado",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            handleEditModalSet();
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el articulo:", error);

          // Mensaje de error
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el articulo",
            text:
              "Ocurrió un error al actualizar los datos del articulo. Por favor, inténtalo nuevamente.",
          });
        });
    })
    .catch((error) => {
      // Handle validation errors
      console.error("Error de validación:", error);

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Ocurrió un error de validación. Por favor, verifica los campos.",
        footer: Object.values(error.errors).join("\n"), // Mostrar los mensajes de error en el cuerpo de la alerta
      });
    });
};


  return (
    <>
      {/* Modal para guardar reseñas */}
      <Modal
        show={openEditModal} //Abrir Modal
        onClose={handleEditModalSet} //Cerrar Modal
        position={"center"} //Posicion
        size={"md"} //tamaño
      >
        <div className="bg-Moradote dark:bg-woodsmoke w-full rounded-lg text-white font-poppins">
          {/* Modal Header */}
          <div className="dark:bg-azulO bg-azul rounded-t-lg flex w-full h-20 items-center justify-center">
            <span className="text-xl font-bold">Editar Artículo</span>
          </div>
          {/* Contenido */}
          <div className="w-full h-full flex flex-col p-8">
            {productoSeleccionado != null ? (
              <>
                <form
                  encType="multipart/form-data"
                  className="text-azulO dark:text-white"
                >
                    <div className="mb-4">
                    <label
                      htmlFor="serial"
                      className="block text-xl font-bold mb-2"
                    >
                      Serial
                    </label>
                    <input
                      type="text"
                      id="serial"
                      name="serial"
                      defaultValue={productoSeleccionado.serial}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-xl font-bold mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      defaultValue={productoSeleccionado.nombre}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cantidad"
                      className="block text-xl font-bold mb-2"
                    >
                      Cantidad
                    </label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      defaultValue={productoSeleccionado.cantidad}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="precio"
                      className="block text-xl font-bold mb-2"
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      defaultValue={productoSeleccionado.precio}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>

                  <div className="mb-4">
                <label
                  htmlFor="categoria"
                  className="block text-xl font-bold mb-2"
                >
                  Categoria
                </label>
                <select
                      defaultValue={productoSeleccionado.categoria}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                onChange={(e) => handleInputChange}
              >
                  <option value="">Selecciona una categoría</option>
                  <option value="Computadoras">Computadoras</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Telefonos">Teléfonos</option>
                  <option value="Perifericos">Periféricos</option>
                  <option value="Accesorios">Accesorios</option>


              </select>
              </div>
                  <div className="mb-4">
                    <label
                      htmlFor="descripcion"
                      className="block text-xl font-bold mb-2"
                    >
                      Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      defaultValue={productoSeleccionado.descripcion}
                      onChange={handleInputChange}
                      className="dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-xl font-bold mb-2"
                    >
                      Imagen
                    </label>
                    <input
                      className="text-sm dark:bg-woodsmoke bg-azulW border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-full"
                      id="file_input"
                      type="file"
                      onChange={(e) => {
                        setImagen(e.target.files[0]);
                      }}
                      name="imagen"
                    />
                  </div>
                </form>
              </>
            ) : null}
          </div>
          {/* Modal Footer */}
          <div className="bg-azul/80 rounded-b-lg dark:bg-azulO/50 flex bottom-0 w-full h-20 items-center">
            <div className="gap-8 flex justify-center w-full h-10">
              <button
                onClick={actualizarProducto}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  handleEditModalSet();
                }}
                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
