import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import EditProfile from "./Modal/EditProfile";
import EditPhoto from "./Modal/EditPhoto";
import Favoritos from "../favoritos";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    ),
});

const API = import.meta.env.VITE_USER_URL;
const API2 = import.meta.env.VITE_EDITPASSWORD_URL;

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [respuesta, setRespuesta] = useState("");
  const [contraseñaError, setContraseñaError] = useState("");
  const [error, setError] = useState("");
  const [showPasswordAct, setShowPasswordAct] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);


  const handleShowPasswordAct = () => {
    setShowPasswordAct(!showPasswordAct);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleModalSet = () => setOpenModal(!openModal);
  const [openModalPhoto, setOpenModalPhoto] = useState(false);
  const handleModalPhotoSet = () => setOpenModalPhoto(!openModalPhoto);
  const [up, setUp] = useState(true);
  const handleUp = () => setUp(!up);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosActualizados({ ...datosActualizados, [name]: value });
  };

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
  }, [up]);

  const ChangePassword = async (e) => {
    e.preventDefault();

    if (!password || !newPassword || !oldPassword) {
      setRespuesta("Por favor, completa todos los campos.");
      setMostrarMensaje(true);
      return;
    }
    if (password !== newPassword) {
      setRespuesta("Las contraseñas no coinciden");
      setMostrarMensaje(true);
      return;
    }
    try {
      await validationSchema.validate({
        password,
      });
      const response = await axios.post(API2, {
        id: user.id,
        oldPassword,
        newPassword,
      });
      Swal.fire({
        icon: "success",
        title: "Cambio de contraseña exitoso",
        text: "Se ha actualizado la contraseña",
      }).then(() => {});
      setMostrarMensaje(false);
      const form = document.getElementById("change_password");
      form.reset();
      setPassword("");
      setNewPassword("");
      setOldPassword("");
    } catch (error) {
      setContraseñaError(error.message);
      setMostrarMensaje(false);
      console.error("Error update password", error);
      Swal.fire({
        icon: "error",
        title: "Error al intentar cambiar contraseña",
        text: "Por favor, intente mas tarde.",
      });
    }
  };
  return (
    <>
      <EditProfile
        openModal={openModal}
        handleModalSet={handleModalSet}
        handleUp={handleUp}
        datosActualizados={datosActualizados}
        setDatosActualizados={setDatosActualizados}
        handleInputChange={handleInputChange}
        user={user}
        userData={userData}
      />
      <EditPhoto
        openModalPhoto={openModalPhoto}
        handleModalPhotoSet={handleModalPhotoSet}
        user={user}
        handleUp={handleUp}
      />
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

                <div className="flex gap-4">
                  <button
                    className="px-2 block md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                    onClick={handleModalPhotoSet}
                  >
                    Editar Foto
                  </button>
                  <button
                    className="px-2 block md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                    onClick={handleModalSet}
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
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
                <span className="text-white font-bold">
                  Correo electrónico:
                </span>
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
            </div>
          </div>
        </div>
      </div>
      {/* Cambio de contraseña  */}
      <div className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dark:bg-azulO/80 bg-azulC shadow overflow-hidden sm:rounded-lg border border-azulO dark:border-azulC">
            {/* Banner */}
            <div className="bg-azulC dark:bg-azulO border-b border-azulO dark:border-azulC px-4 py-5 sm:px-6">
              <h1 className="text-2xl font-semibold text-white ml-4">
                Cambiar contraseña
              </h1>
            </div>

            {/* User Info */}
            <form id="change_password" className="px-4 py-5 sm:p-6">
              <div className="mb-8">
                <div>
                  <label className="text-white font-bold">
                    Contraseña Actual
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className={
                        "dark:bg-woodsmoke/50 bg-azulW/50 border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-64 p-2.5"
                      }
                      type={showPasswordAct ? "text" : "password"}
                      id="contraseña"
                      name="contraseña"
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleShowPasswordAct}
                      className="absolute ml-56 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                    >
                      {showPasswordAct ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-white font-bold">Contraseña</label>
                  <div className="relative">
                    <input
                      className={`dark:bg-woodsmoke/50 bg-azulW/50 border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-64 p-2.5 ${
                        contraseñaError ? "border-red-500/50" : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      id="nuevacontraseña"
                      name="nuevacontraseña"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="absolute ml-56 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {contraseñaError && (
                    <p className="text-white font-bold mb-4 text-sm mt-1">
                      {contraseñaError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-white font-bold">
                    Confirmar Contraseña
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className={
                        "dark:bg-woodsmoke/50 bg-azulW/50 border-azulO dark:text-white text-azulO placeholder:text-azulO/80 dark:placeholder:text-gray-500 m:text-sm rounded-lg border-2 focus:border-azul focus:ring-0 block w-64 p-2.5"
                      }
                      type={showPasswordNew ? "text" : "password"}
                      name="confirm"
                      id="confirm"
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleShowPasswordNew}
                      className="absolute ml-56 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                    >
                      {showPasswordNew ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

              </div>
              {mostrarMensaje && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-8 rounded">
                  <p className="text-sm font-bold">{respuesta}</p>
                </div>
              )}
              <div className="flex gap-4">
                <button
                  className="px-2 py-2 block md:inline-block rounded-md text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 border-azulO dark:border-azulO/70 hover:bg-azulC focus-within:bg-azulO"
                  onClick={ChangePassword}
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
          <Favoritos />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
