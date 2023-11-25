import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API = import.meta.env.VITE_DECODE_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("null");
  const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para controlar si el usuario está autenticado

  const getDecodedData = async () => {
    const options = {
      method: "GET",
      url: API,
      withCredentials: true,
    };

    try {
      const response = await axios(options);
      const data = response.data.data;
      setUser(data);
      setLoggedIn(true); // Establecer loggedIn a true cuando se obtengan los datos decodificados correctamente
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Eliminar la cookie (si estás utilizando cookies para almacenar el token de autenticación)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Limpiar el almacenamiento local (localStorage o sessionStorage)
    localStorage.removeItem("token");

    // Establecer user y loggedIn a null y false respectivamente
    setUser("null");
    setLoggedIn(false);

    // Realizar cualquier otra limpieza o redireccionamiento necesario después de cerrar sesión
  };

  useEffect(() => {
    getDecodedData();
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, loggedIn, getDecodedData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;