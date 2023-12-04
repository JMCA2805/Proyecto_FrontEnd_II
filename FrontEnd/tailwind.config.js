/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
      "./src/components/**/*.{js,jsx,ts,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  
    ],
    //DarkMode
    darkMode: "class",
    theme: {
      //Configuración de los responsive
  
      extend: {
        display: ['group-focus'],
        opacity: ['group-focus'],
        inset: ['group-focus'],
            colors: {
          //Colores personalizados
          "white-smoke": "#f5f5f5",
          woodsmoke: "#141414",
          azulO: "#131c53",
          azulC: "#4d76ff",
          azul: "#213ae1",
          azulW: "#dbebff"
        },
        fontFamily: {
          poppins: ['Poppins', 'Arial', 'sans-serif'],
        },
      },
    },
      plugins: [
      require('flowbite/plugin')
  
    ],
  };
  