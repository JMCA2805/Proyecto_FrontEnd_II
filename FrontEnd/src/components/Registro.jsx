import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const API = import.meta.env.VITE_REGISTER_URL;

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmContraseña, setConfirmContraseña] = useState("");
  const [contraseñasMatch, setContraseñasMatch] = useState(true);
  const [error, setError] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  //Comprobación de la existencia de un token
  useEffect(() => {
    if (loggedIn) {
      Swal.fire({
        icon: "success",
        title: "Ya estas Logueado",
        text: "¡Bienvenido!",
      }).then(() => {
        navigate("/");
      });
    }
  }, [loggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos obligatorios no estén vacíos
    if (!nombre || !apellido || !correo || !contraseña || !confirmContraseña) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (contraseña !== confirmContraseña) {
      setContraseñasMatch(false);
      return;
    }

    const usuario = {
      nombre,
      apellido,
      correo,
      contraseña,
    };

    try {
      const response = await axios.post(API, usuario);

      // Mostrar mensaje de confirmación con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "El usuario se ha registrado exitosamente.",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      setError("Ocurrió un error al registrar el usuario");
      console.error(error);

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar el usuario.",
      });
    }
  };

  return (
<div className="flex justify-center items-center min-h-screen bg-azulO dark:bg-black p-4">
  <form
    className="bg-azulW p-8 rounded-lg shadow-lg w-96 dark:bg-azulO dark:border-azulC dark:border text-white"
    onSubmit={handleSubmit}
  >
    <h2 className="text-2xl text-black dark:text-white font-semibold mb-6">Registro</h2>
    <div className="mb-4">
      <label className="block font-medium mb-2 text-black dark:text-white" htmlFor="nombre">
        Nombre
      </label>
      <input
        className="w-full p-2 border rounded-md bg-azulO/30 border-azulO text-black dark:text-white placeholder-text-white/50 sm:text-sm focus:border-2 focus:border-azulO focus:ring-0 dark:border-azulC/50 dark:focus:border-azulC"
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-2 text-black dark:text-white" htmlFor="apellido">
        Apellido
      </label>
      <input
        className="w-full p-2 border rounded-md bg-azulO/30 border-azulO text-black dark:text-white placeholder-text-white/50 sm:text-sm focus:border-2 focus:border-azulO focus:ring-0 dark:border-azulC/50 dark:focus:border-azulC"
        type="text"
        id="apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-black dark:text-white font-medium mb-2" htmlFor="correo">
        Correo electrónico
      </label>
      <input
        className="w-full p-2 border rounded-md bg-azulO/30 border-azulO text-black dark:text-white placeholder-text-white/50 sm:text-sm focus:border-2 focus:border-azulO focus:ring-0 dark:border-azulC/50 dark:focus:border-azulC"
        type="email"
        id="correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-black dark:text-white font-medium mb-2" htmlFor="contraseña">
        Contraseña
      </label>
      <input
        className="w-full p-2 border rounded-md bg-azulO/30 border-azulO text-black dark:text-white placeholder-text-white/50 sm:text-sm focus:border-2 focus:border-azulO focus:ring-0 dark:border-azulC/50 dark:focus:border-azulC"
        type="password"
        id="contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
      />
    </div>
    <div className="mb-6">
      <label
        className="block font-medium text-black dark:text-white mb-2"
        htmlFor="confirmContraseña"
      >
        Confirmar Contraseña
      </label>
      <input
        className={`w-full p-2 border rounded-md bg-azulO/30 text-black dark:text-white placeholder-text-white/50 sm:text-sm focus:border-2 focus:ring-0 ${
          contraseñasMatch
            ? "border-azulO dark:border-azulC/50 dark:focus:border-azulC focus:border-azulO"
            : "border-red-500/50 focus:border-red-500"
        }`}
        type="password"
        id="confirmContraseña"
        value={confirmContraseña}
        onChange={(e) => {
          setConfirmContraseña(e.target.value);
          setContraseñasMatch(true);
        }}
        required
      />
      {!contraseñasMatch && (
        <p className="text-red-500 text-sm mt-1">
          Las contraseñas no coinciden.
        </p>
      )}
    </div>
    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
    <button
      className="py-2 px-4 rounded-md w-full border-b-4 dark:border-azulC border-azulO hover:bg-azulO/50 dark:hover:bg-azulC/70 focus-within:bg-azulO text-black dark:text-white bg-azulO/30 dark:bg-azulC"
      type="submit"
    >
      Registrarse
    </button>
  </form>
</div>
  );
};

export default RegisterForm;
