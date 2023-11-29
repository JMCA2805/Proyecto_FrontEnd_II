import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import EditProfile from "./Modal/EditProfile";
import EditPhoto from "./Modal/EditPhoto";

const API = import.meta.env.VITE_USER_URL;

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [datosActualizados, setDatosActualizados] = useState({});

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
    </>
  );
};

export default UserProfile;
