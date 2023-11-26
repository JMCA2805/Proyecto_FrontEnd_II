import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API = import.meta.env.VITE_USERS_URL;
const APIEDIT = import.meta.env.VITE_EDIT_URL;
const APIDELETE = import.meta.env.VITE_ELIMINARUSUARIO_URL;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});

  useEffect(() => {
    // Lógica para obtener los datos de los usuarios desde el backend
    axios
      .get(API)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const eliminarUsuario = (correo) => {
    // Mostrar confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios
          .delete(APIDELETE, { data: { correo: correo } })
          .then((response) => {
            // Filtra los usuarios y excluye al usuario eliminado
            const usuariosActualizados = users.filter(
              (usuario) => usuario.correo !== correo
            );
            setUsers(usuariosActualizados);

            // Mensaje de confirmación
            Swal.fire({
              icon: "success",
              title: "Usuario eliminado",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error al eliminar el usuario:", error);

            // Mensaje de error
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el usuario",
              text: "Ocurrió un error al eliminar el usuario. Por favor, inténtalo nuevamente.",
            });
          });
      }
    });
  };

  return (
    <div className="font-[Barlow] mb-8">
      <div className="bg-MoradoC dark:bg-MoradoO rounded-lg p-4 mx-4 mt-4 sm:mx-28 mb-8 border dark:border-VerdeC border-MoradoO">
        <h2 className="text-white text-3xl font-bold text-center">
          Lista de Usuarios
        </h2>
      </div>
      {users.length === 0 ? (
        <div className="flex w-full justify-center items-center text-white">
          <p>No hay usuarios disponibles.</p>
        </div>
      ) : (
        <div className="w-full px-10 h-full">
          <div className="overflow-x-auto p-8 w-full h-full rounded-xl dark:bg-MoradoO/50 bg-Moradote/50">
            <div className="inline-block min-w-full shadow rounded-xl overflow-hidden h-full dark:border-VerdeC border border-MoradoO">
              <table className="min-w-full leading-normal  sm:text-xs md:text-sm text-left text-white dark:text-white mb-6">
                <thead className="text-white bg-MoradoC dark:bg-MoradoO dark:text-white border-b dark:border-VerdeC border-MoradoO">
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="sm:p-2 md:px-6 md:py-3 text-center"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="sm:p-2 md:px-6 md:py-3 text-center"
                    >
                      Apellido
                    </th>
                    <th
                      scope="col"
                      className="sm:p-2 md:px-6 md:py-3 text-center"
                    >
                      Correo
                    </th>
                    <th
                      scope="col"
                      className="sm:p-2 md:px-6 md:py-3 text-center"
                    >
                      Descripción
                    </th>
                    <th
                      scope="col"
                      className="sm:p-2 md:px-6 md:py-3 text-center"
                    >
                      Teléfono
                    </th>
                    <th
                      scope="col"
                      className="sm:p-2 md:px-6 md:py-3 text-center"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) ? (
                    users.map((usuario) => (
                      <tr key={usuario._id}>
                        <td className="sm:p-2 md:px-6 md:py-3 text-center">
                          {usuario.nombre}
                        </td>
                        <td className="sm:p-2 md:px-6 md:py-3 text-center">
                          {usuario.apellido}
                        </td>
                        <td className="sm:p-2 md:px-6 md:py-3 text-center">
                          {usuario.correo}
                        </td>
                        <td className="sm:p-2 md:px-6 md:py-3 text-center">
                          {usuario.descripcion}
                        </td>
                        <td className="sm:p-2 md:px-6 md:py-3 text-center">
                          {usuario.telefono}
                        </td>
                        <td className="sm:p-2 md:px-6 md:py-3 text-center">
                          <div className="flex items-center w-full">
                            <button
                              className="text-white px-4 py-2 rounded-lg mr-2 bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-Moradote/50 dark:hover:bg-MoradoC/70 focus-within:bg-MoradoO"
                              onClick={() => editarUsuario(usuario)}
                            >
                              Editar
                            </button>

                            <button
                              className="text-white px-4 py-2 rounded-lg mr-2 bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-Moradote/50 dark:hover:bg-MoradoC/70 focus-within:bg-MoradoO"
                              onClick={() => eliminarUsuario(usuario.correo)}
                            >
                              Borrar
                            </button>
                            {/* Otros botones de acción */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">Cargando usuarios...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {usuarioSeleccionado && (
        <div className="mx-4 md:mx-24  font-[Barlow] bg-MoradoC dark:bg-MoradoO rounded-lg p-4 text-white mt-8 border dark:border-VerdeC border-MoradoO">
          <h2 className="text-lg font-semibold">Editar usuario</h2>
          <form>
            <div className="flex flex-col mt-2">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={datosActualizados.nombre || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-verdeo rounded-md bg-MoradoO/30 border-MoradoO text-white placeholder:text-white/50 focus:border-2 focus:border-MoradoO focus:ring-0 dark:border-VerdeC/50 dark:focus:border-VerdeC"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={datosActualizados.apellido || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-verdeo rounded-md bg-MoradoO/30 border-MoradoO text-white placeholder:text-white/50 focus:border-2 focus:border-MoradoO focus:ring-0 dark:border-VerdeC/50 dark:focus:border-VerdeC"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="descripcion">Descripcion:</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={datosActualizados.descripcion || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-verdeo rounded-md bg-MoradoO/30 border-MoradoO text-white placeholder:text-white/50 focus:border-2 focus:border-MoradoO focus:ring-0 dark:border-VerdeC/50 dark:focus:border-VerdeC"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={datosActualizados.telefono || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-verdeo rounded-md bg-MoradoO/30 border-MoradoO text-white placeholder:text-white/50 focus:border-2 focus:border-MoradoO focus:ring-0 dark:border-VerdeC/50 dark:focus:border-VerdeC"
              />
            </div>
            {/* Otros campos del formulario */}
            <div className="flex mt-4">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-lg mr-2 bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-Moradote/50 dark:hover:bg-MoradoC/70 focus-within:bg-MoradoO"
                onClick={() => {
                  setUsuarioSeleccionado(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="text-white px-4 py-2 rounded-lg mr-2 bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-Moradote/50 dark:hover:bg-MoradoC/70 focus-within:bg-MoradoO"
                onClick={actualizarUsuario}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserTable;
