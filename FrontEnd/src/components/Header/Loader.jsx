import React from 'react';

const Loader = () => {

  // Evitar el desplazamiento de la página mientras se muestra el Loader
React.useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => {
  document.body.style.overflow = 'auto';
  };
  }, []);
  return (
    <div className="absolute top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="flex items-center space-x-2 text-white">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 4.418 3.582 8 8 8v-4zm-3-5.291l-3 2.646A7.962 7.962 0 014 12H0c0 1.654.513 3.185 1.382 4.459zM20 12a8 8 0 01-8 8v4c4.418 0 8-3.582 8-8h-4zm-5-7.938A7.962 7.962 0 0116 12h4c0-1.654-.513-3.185-1.382-4.459l-3 2.647z"
          ></path>
        </svg>
        <span>Cargando...</span>
      </div>
    </div>
  );
};

export default Loader;