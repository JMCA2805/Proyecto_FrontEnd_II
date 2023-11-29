import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2

const API = import.meta.env.VITE_USER_URL;
const API2 = import.meta.env.VITE_USERS_URL;
const APIEDIT = import.meta.env.VITE_EDIT_URL;

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [imagen, setImagen] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [datosActualizados, setDatosActualizados] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API}/${user.id}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchUserData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagen", imagen);

    // Verificar que los campos obligatorios no estén vacíos
    if (!imagen) {
      setRespuesta("Por favor, completa todos los campos.");
      setMostrarMensaje(true);
      return;
    }

    try {
      const response = await axios.post(`${API2}/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMostrarFormulario(false);
      setUserData(response.data);
      setMostrarMensaje(true);
      fetchUserData();

      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);

      // Mostrar mensaje de confirmación con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Foto de perfil cambiada",
        text: "Foto de perfil cambiada exitosamente.",
      });
    } catch (error) {
      console.error(error);
      setRespuesta("Ocurrió un error al cambiar la foto de perfil");

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al cambiar la foto de perfil",
      });
    }
  };

  const handleClickCambiarFoto = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  //ACTUALIZAR DATOS

  const editarUsuario = (usuario) => {
    setDatosActualizados({ ...usuario });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosActualizados({ ...datosActualizados, [name]: value });
  };
  const actualizarUsuario = (e) => {
    e.preventDefault(); // Evita que la página se reinicie por defecto
    console.log(datosActualizados);

    axios
      .post(`${APIEDIT}/${user.id}`, {
        id: user.id,
        datosActualizados,
      })
      .then((response) => {
        setUserData({ ...userData, ...datosActualizados });

        setDatosActualizados({});

        // Mensaje de confirmación
        Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);

        // Mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el usuario",
          text: "Ocurrió un error al actualizar los datos del usuario. Por favor, inténtalo nuevamente.",
        });
      });
  };

  ///Esto estara proximamente integrado con nuestra Base de Datos de Usuarios, para detectar el token actual y compararlo con los usuarios para asi encontrar sus datos
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark:bg-azulO/80 bg-azulC shadow overflow-hidden sm:rounded-lg border border-azulO dark:border-azulC">
          {/* Banner */}
          <div className="bg-azulC dark:bg-azulO border-b border-azulO dark:border-azulC px-4 py-5 sm:px-6">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 rounded-full border-2 border-white text-white"
                  src={userData?.imagen}
                  alt="Proximamente / En Desarrollo"
                />
                <h1 className="text-2xl font-semibold text-white ml-4">
                  {`${userData?.nombre} ${userData?.apellido}`}
                </h1>
              </div>

              {/* Botón "Cambiar Foto" */}
              <button
                className="py-2 px-4 rounded-md col-span-2 border-b-4 dark:border-azulC border-azulO hover:bg-azulO/50 dark:hover:bg-azulC/70 focus-within:bg-azulO text-white bg-azulO/30 dark:bg-azulC"
                onClick={handleClickCambiarFoto}
              >
                {mostrarFormulario ? "Ocultar Formulario" : "Editar Perfil"}
              </button>
            </div>

            {/* Formulario de carga de imagen */}
            {mostrarFormulario && (
              <form
                className="mt-8 space-y-6 flex flex-col"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  className="block w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-azulC dark:text-white  focus:outline-none dark:bg-azulC dark:border-gray-azulC dark:placeholder-azulC"
                  id="file_input"
                  type="file"
                  onChange={(e) => {
                    setImagen(e.target.files[0]);
                  }}
                  name="imagen"
                />

                <button
                  type="submit"
                  className="py-2 px-4 rounded-md w-full col-span-2  border-b-4 dark:border-azulC border-azulO hover:bg-azulO/50 dark:hover:bg-azulC/70 focus-within:bg-azulO text-white bg-azulO/30 dark:bg-azul"
                >
                  Enviar Foto
                </button>
              </form>
            )}

            {mostrarMensaje && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-6 rounded">
                <p className="text-sm font-bold">{respuesta}</p>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <svg
                className="h-6 w-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-white font-bold">Correo electrónico:</span>
              <span className="ml-2 text-white">{userData?.correo}</span>
            </div>
            <div className="flex items-center mb-4">
              <svg
                className="h-6 w-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-white font-bold">Teléfono:</span>
              <span className="ml-2 text-white">{userData?.telefono}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-white font-bold">Descripción:</span>
              <span className="ml-2 text-white">{userData?.descripcion}</span>
            </div>

            {mostrarFormulario && (
              <div className="mx-4 md:mx-24 font-[Barlow] bg-MoradoC dark:bg-MoradoO rounded-lg p-4 text-white mt-8 border dark:border-VerdeC border-MoradoO">
                <div className="">
                  <h2 className="text-lg font-semibold">Editar usuario</h2>
                  <form>
                    {/* Campos existentes */}
                    <div className="flex flex-col mt-2">
                      <label htmlFor="descripcion">Descripción:</label>
                      <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={datosActualizados.descripcion || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-verdeo rounded-md bg-MoradoO/30 border-MoradoO text-black placeholder:text-white/50 focus:border-2 focus:border-MoradoO focus:ring-0 dark:border-VerdeC/50 dark:focus:border-VerdeC"
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
                        className="w-full p-2 border border-verdeo rounded-md bg-MoradoO/30 border-MoradoO text-black placeholder:text-white/50 focus:border-2 focus:border-MoradoO focus:ring-0 dark:border-VerdeC/50 dark:focus:border-VerdeC"
                      />
                    </div>
                    {/* Otros campos del formulario */}
                    <div className="flex mt-4">
                      <button
                        className="text-white px-4 py-2 rounded-lg mr-2 bg-Moradote focus:outline-none focus:text-white border-b-4 dark:border-VerdeC border-MoradoO hover:bg-Moradote/50 dark:hover:bg-MoradoC/70 focus-within:bg-MoradoO"
                        onClick={actualizarUsuario}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
