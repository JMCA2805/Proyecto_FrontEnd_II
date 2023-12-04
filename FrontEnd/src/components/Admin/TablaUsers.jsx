import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditUser from "./Modal/EditUser";

const API = import.meta.env.VITE_USERS_URL;
const APIDELETE = import.meta.env.VITE_ELIMINARUSUARIO_URL;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});

  const [up, setUp] = useState(true);
  const handleUp = () => setUp(!up);

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
  }, [up]);

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalSet = () => setOpenEditModal(!openEditModal);

  const editarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setDatosActualizados({ ...usuario });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosActualizados({ ...datosActualizados, [name]: value });
  };

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
    <>
      <EditUser
        openEditModal={openEditModal}
        handleEditModalSet={handleEditModalSet}
        usuarioSeleccionado={usuarioSeleccionado}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        setDatosActualizados={setDatosActualizados}
        handleInputChange={handleInputChange}
        datosActualizados={datosActualizados}
        handleUp={handleUp}
      />
      <div className="w-full px-10 h-full">
        <div className="md:px-8 px-4 py-4 w-full h-full rounded-xl dark:bg-azulO/50 bg-azulC/80 mb-4">
          <div className="font-[Barlow] mb-8 px-4">
            <div className="bg-azul dark:bg-azulO rounded-lg p-4 mx-4 mt-4 sm:mx-28 mb-2 border dark:border-azulC border-azulO">
              <h2 className="text-white text-3xl font-bold text-center">
                Lista de Usuarios
              </h2>
            </div>
            {users.length === 0 ? (
              <div className="flex w-full justify-center items-center dark:text-white text-azulO font-bold">
                <p>No hay usuarios disponibles.</p>
              </div>
            ) : (
              <div className="overflow-x-auto  shadow rounded-xl overflow-hidden h-full dark:border-azulC border border-azulO">
                <table className=" w-full leading-normal text-xs md:text-sm text-left">
                  <thead className="text-white bg-azul dark:bg-azulO border-b dark:border-azulC border-azulO">
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
                  <tbody className="bg-azulW dark:bg-black/50 text-azulO dark:text-white">
                    {Array.isArray(users) ? (
                      users.map((usuario, index) => (
                        <tr key={index}>
                          <td className="p-4 md:px-6 md:py-3 text-center">
                            {usuario.nombre}
                          </td>
                          <td className="p-4 md:px-6 md:py-3 text-center">
                            {usuario.apellido}
                          </td>
                          <td className="p-4 md:px-6 md:py-3 text-center">
                            {usuario.correo}
                          </td>
                          <td className="p-4 md:px-6 md:py-3 text-center">
                            {usuario.descripcion}
                          </td>
                          <td className="p-4 md:px-6 md:py-3 text-center">
                            {usuario.telefono}
                          </td>
                          <td className="p-4 md:px-6 md:py-3 text-center">
                            <div className="flex items-center justify-center w-full gap-4">
                              <button
                                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                                onClick={() => {
                                  editarUsuario(usuario);
                                  handleEditModalSet();
                                }}
                              >
                                Editar
                              </button>

                              <button
                                className="block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
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
                        <td
                          colSpan="7"
                          className="dark:text-white text-azulO font-bold"
                        >
                          Cargando usuarios...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
