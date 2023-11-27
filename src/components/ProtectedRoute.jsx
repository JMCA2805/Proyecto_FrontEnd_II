import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const ProtectedRoute = ({ allowedRoles, redirectTo = "/Login", children }) => {
  const { user, loggedIn, loading } = useContext(AuthContext);

  if (loading) return <h1 className="text-azulO dark:text-white">Cargando...</h1>;

  if (!loading && !loggedIn) {
    Swal.fire({
      icon: "error",
      title: "Usuario no logueado",
      text: "Redireccionando a Login",
    });
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (allowedRoles.some((rol) => user.rol.includes(rol))) {
      // Si el usuario tiene al menos uno de los roles permitidos, mostrar el contenido
      return children ? children : <Outlet />;
    } else {
      // Si el usuario no tiene los roles permitidos, redirigir a la página de inicio
      Swal.fire({
        icon: "error",
        title: "Sin Acceso",
        text: "Redireccionando a Inicio",
      });
      return <Navigate to={"/"} replace />;
    }
  }

  // Si no se especificaron roles permitidos, mostrar el contenido sin restricciones
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
