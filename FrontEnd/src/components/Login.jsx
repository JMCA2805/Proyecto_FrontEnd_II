import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider"; // Ruta relativa al archivo AuthProvider
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API = import.meta.env.VITE_LOGIN_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const { getDecodedData, loggedIn } = useContext(AuthContext); // Obtener la función getDecodedData del contexto

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API, {
        correo: email,
        contraseña: password,
      });

      const { token } = response.data.usuario;

      // Guardar el token como una cookie
      document.cookie = `token=${token}; path=/`;

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "¡Bienvenido!",
      }).then(() => {
        getDecodedData();
        navigate("/");
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Por favor, verifica tus credenciales e intenta nuevamente.",
      });
    }
  };

  return (
    <section className="bg-azulO dark:bg-woodsmoke p-4">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-white dark:text-white mb-7"
        >
          <img className="h-40 inline " src="./logo.png" alt="" />
        </a>
        <div className="w-full bg-azulC rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-azulO dark:border-azulC">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Accede a tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-azulO/30 border border-azulO text-white placeholder:text-white/50 sm:text-sm rounded-lg focus:border-2 focus:border-azulO focus:ring-0 block w-full p-2.5 dark:border-azulC/50 dark:focus:border-azulC"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-azulO/30 border border-azulO text-white placeholder:text-white/50 sm:text-sm rounded-lg focus:border-2 focus:border-azulO focus:ring-0 block w-full p-2.5 dark:border-azulC/50 dark:focus:border-azulC"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg py-3.5 font-semibold text-center border-b-4 dark:border-azulC border-azulO hover:bg-azulO/50 dark:hover:bg-azulC/70 focus-within:bg-azulO text-white bg-azulO/30 dark:bg-azulC"
              >
                Ingresar
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center p-4 bg-azulC border-t dark:bg-azulO dark:border-azulC/50 border-azulO">
            <span className="text-sm text-white">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/Registro"
                className="text-white font-bold hover:text-azulW "
              >
                Registro
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
