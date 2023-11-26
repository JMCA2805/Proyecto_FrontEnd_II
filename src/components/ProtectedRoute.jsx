import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user === null) {
    // Si el objeto user es null, permitir el acceso a la página de inicio de sesión
    return <Outlet />;
  }

  if (!user) {
    Swal.fire({
      icon: 'error',
      title: 'Sin Acceso',
      text: 'Redireccionando a Inicio',
    });
    // Si el objeto user es undefined, redirigir a la página de inicio
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!user.nombre) {
    // Si el usuario no está logueado, redirigir a la página de inicio de sesión
    Swal.fire({
      icon: 'error',
      title: 'Sin Acceso',
      text: 'Redireccionando a Inicio',
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (allowedRoles.some((rol) => user.rol.includes(rol))) {
      
      // Si el usuario tiene al menos uno de los roles permitidos, mostrar el contenido
      return <Outlet />;
    } else {
      // Si el usuario no tiene los roles permitidos, redirigir a la página de inicio
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  // Si no se especificaron roles permitidos, mostrar el contenido sin restricciones
  return <Outlet />;
};

export default ProtectedRoute;