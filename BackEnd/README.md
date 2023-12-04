# **WebStore Wonderland**

**Descripción:**
Es una aplicación web creada utilizando ReactJS con Vite como bundler, Tailwind CSS y el plugin Flowbite, dicha aplicación web se conecta a una base de datos para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre la Tienda Online, Compras y Reseñas. La aplicación web funciona como un SPA (Single Page Application) y utiliza programación reactiva para mostrar la lista de productos que el admin desee ver. Además, de que los usuarios pueden comprar, loguearse, registrarse, entre otros.

# **Requisitos e instalación:**

1. Se necesitan los siguientes componentes: Node.JS, MongoDB y NPM

2. Se dirigen hacia la dirección de ambos Proyectos en Github: 

- Proyecto Backend en GitHub: [https://github.com/JMCA2805/Proyecto_FrontEnd_II_BackEnd]
- Proyecto FrontEnd en GitHub: [https://github.com/JMCA2805/Proyecto_FrontEnd_II]

3. Seleccionan a Code y Local, luego los descargamos en Download ZIP

4. A partir de esto, nos quedaria en ZIP cada uno y los extraemos, meteremos ambos en una misma carpeta

5. Luego, abrimos Visual Studio Code y pasamos/abrimos la carpeta dentro del programa, desde Archivo/Abrir Carpeta, y hacemos lo mismo en otra ventana, una para el back y otra para el front

5.5. Pasamos las variables de entornos, la de .env a el Backend y la de .env.local al Front-End

6. Ahora que tenemos nuestro proyecto colocado, tan solo tenemos que abrir consola con CTRL + Ñ o Desde Terminal/Abrir Terminal en cada una de las ventanas

7. Al iniciar la terminal, vamos a instalar los paquetes que tiene el proyecto, utilizando `npm i` o `npm install` esto debe hacerse en ambas ventanas

8. Luego usamos el comando `npm run dev` y el programa se ejecutara, esto debe hacerse en ambas ventanas

9. Vamos hacia [http://localhost:3000] y ahí tendremos la página ejecutándose.

9.5- Recuerden usar MongoDB Compass u otra interfaz como un Plugin de VS para usar los archivos CSV, de users y reservas que dejamos

10. El admin es admin@gmail.com , su contraseña es 123, para que puedan probar el modo Admin.

# **Uso:**

La aplicación es una SPA (Single Page Application), esta nos permite hacer un CRUD Básico:

- **Crear:** Desde la sección "admin" podras crear diferentes ofertas, productos, artículos, entre otros

- **Leer:** Los productos, ofertas, artículos y usuarios se leerán y apareceran en el Admin

- **Editar:** El administrador podrá ver los datos de los usuarios, ofertas, articulos y productos ademas podra editarlos

- Login: Puedes loguearte como usuario, tendras el rol de usuario o puedes acceder con la cuenta de admin

- Registro: Puedes registrarte como un usuario, a partir de campos de datos, y luego accederas como usuario

- Blog: Hay un sitio de blog, en donde hay articulos referentes a la tecnología y demas

- Las rutas estan protegidas por permisos, dados desde el Front a partir de ciertos requisitos 

- Correo: Al hacer una compra, este mandara un correo de la factura confirmada a el correo del usuario, además, cada dia a las 8AM mandara un correo de promocion/Oferta a los usuarios

# **Estructura del Proyecto:**

<<<<<<< HEAD
**Carpeta Base:**

- **node_modules/**: Esta carpeta es generada automáticamente cuando se instalan las dependencias del proyecto utilizando el comando `npm install`. Aquí se almacenan todas las bibliotecas y módulos de terceros necesarios para el funcionamiento del proyecto.

- **public/**: Esta carpeta suele contener los archivos estáticos que se servirán públicamente en el proyecto, como imágenes, archivos CSS o cualquier otro recurso estático.
- 
- **vite.config.js**: Este archivo es la configuración del entorno de desarrollo basado en Vite. Vite es un entorno de compilación rápida para aplicaciones web modernas. 

- **tailwind.config.js**: Este archivo es la configuración de Tailwind CSS, un framework de utilidades CSS altamente personalizable.
- 
- **postcss.config.js**: Este archivo es la configuración de PostCSS, una herramienta de transformación de CSS. Aquí puedes especificar los plugins de PostCSS que deseas utilizar y configurar sus opciones.

- **package.json**: Este archivo es un archivo de configuración para administrar las dependencias y scripts de tu proyecto. Aquí se enumeran todas las dependencias del proyecto, así como los scripts definidos que se pueden ejecutar con el comando npm run.

- **package-lock.json**: Este archivo se genera automáticamente cuando se instalan las dependencias del proyecto y se utiliza para bloquear versiones específicas de las dependencias.

- **.gitignore**: Este archivo se utiliza para especificar qué archivos y carpetas deben ser ignorados por Git, el sistema de control de versiones.

- **eslintrc.cjs**: Este archivo es la configuración de ESLint, una herramienta de análisis de código estático para identificar y reportar patrones problemáticos en el código JavaScript.

**Carpeta SRC**

- **main.jsx**: Este archivo es el punto de entrada principal de la aplicación. Es comúnmente utilizado para importar y renderizar el componente principal de la aplicación, como el componente App. Aquí se configuran las rutas, se establece el tema o se realizan otras configuraciones globales de la aplicación.

- **index.css**: Este archivo contiene estilos CSS que se aplicarán a toda la aplicación.

- **app.jsx**: Este archivo es el componente principal de la aplicación. Es donde se define y se estructura la interfaz de usuario de la aplicación.

**La carpeta Components/ contiene:** 

- **Una carpeta Header/:** Esta carpeta contiene los componentes de encabezado de tu aplicación, así como un loader y el menú para navegar por la página.

- **Una carpeta Admin/:** Esta carpeta contiene los componentes que usa el Admin dentro de su sección.

- **Una carpeta Blog/:** Esta carpeta contiene los componentes que usa la pagina de Blog y Articulos.

- AnimatedPage: Este componente se aplica de forma general en el app.jsx en conjunto al Framer-Motion para establecer una animación apenas se cambie de pagina o entres a la pagina

- Footer: El footer del sitio

- Profile: Es el componente que tendrá los datos del usuario y se podrán editar, aun se encuentra en construcción pero puede ser accesible como Usuario y Admin, aunque tendrá mensajes de proximamente en el sistema

- ProtectedRoute: El componente que envuelve a las rutas, para verificar si estas rutas cumplen con las condicionales propuestas en si

- Registro: El registro de usuario

La carpeta assets/ generalmente se utiliza para almacenar recursos estáticos, como imágenes, archivos de video, fuentes, iconos, etc. Puedes colocar cualquier archivo multimedia o recurso estático que necesites en el proyecto.

La carpeta de context: Posee los context de la aplicación, como por ejemplo el AuthProvider que sirve para la autenticación de permisos, extrayendo y decodificando la cookie(token)
que se encuentre activa, asi como el contexto global para el uso del modo oscuro

=======
**Carpeta Base**

Posee una gran mayoria de archivos de configuración, que van desde el archivo de la variable de entorno, el git ignore para ignorar ciertas partes del codigo a la hora de subirse al repositorio, los package-json con la información de nuestras dependencias y demas, entre otros

**Carpeta SRC**

Usamos el estilo Model-Controller-Route para la realización del Back-End, en el Model poseemos la gestión de los datos, en donde hacemos la interacción con la base de datos. El controller, funciona para ser como un intermediario entre modelo y route, es el que procesara las solicitudes, validara las peticiones y hara que los datos lleguen de mejor forma al Model. En cuanto a los Routes, Las rutas son responsables de definir los puntos finales (endpoints) de la aplicación web. Son encargadas de mapear las URL recibidas a funciones de controlador apropiada

En la carpeta, poseemos los archivos database y server para lograr la conexión con la DataBase de forma apropiada(ademas, de que el server posee las configuraciones del servidor, entre otros.), en conjunto con el index
>>>>>>> repo-a/dev-v2

# **Dependencias y DevDependencias**

**Dependencias:**

<<<<<<< HEAD
Axios: Una biblioteca para realizar solicitudes HTTP en aplicaciones web.

Dotenv: Una biblioteca para cargar variables de entorno desde archivos .env.

Flowbite: Una biblioteca de componentes de interfaz de usuario (UI) para React.

Framer Motion: Una biblioteca para agregar animaciones y transiciones a componentes en React.

Leaflet: Una biblioteca de mapas interactivos de código abierto para la web.

React: Una biblioteca de JavaScript para construir interfaces de usuario.

React-DOM: Un paquete de React para interactuar con el DOM.

React Icons: Una biblioteca de iconos para React.

React Router DOM: Una biblioteca de enrutamiento para aplicaciones web construidas con React.

SweetAlert2: Una biblioteca para mostrar ventanas modales y mensajes de alerta personalizados.

**DevDependencies:**

"@types/react": "^18.2.15": Definiciones de tipos TypeScript para React.

"@types/react-dom": "^18.2.7": Definiciones de tipos TypeScript para ReactDOM.

"@vitejs/plugin-react": "^4.0.3": Plugin de Vite para admitir la sintaxis de React.

"autoprefixer": "^10.4.16": Plugin de PostCSS para agregar prefijos de proveedores en los estilos CSS.

"eslint": "^8.45.0": Herramienta de análisis de código estático para JavaScript.

"eslint-plugin-react": "^7.32.2": Plugin de ESLint para reglas específicas de React.

"eslint-plugin-react-hooks": "^4.6.0": Plugin de ESLint para reglas específicas de los Hooks de React.

"eslint-plugin-react-refresh": "^0.4.3": Plugin de ESLint para reglas específicas de React Refresh.

"postcss": "^8.4.31": Herramienta de transformación de CSS.

"tailwindcss": "^3.3.3": Framework de utilidades CSS altamente personalizable.

"vite": "^4.4.5": Entorno de compilación rápida para aplicaciones web modernas.
=======
bcrypt (^5.1.1): Una biblioteca para el hashing de contraseñas. Se utiliza para almacenar contraseñas de forma segura en la base de datos.

cookie-parser (~1.4.4): Un middleware de Express para analizar las cookies de las solicitudes entrantes. Facilita el manejo de cookies en una aplicación Express.

cords (^1.0.4): Una biblioteca para el manejo de cuerdas en JavaScript. Proporciona funciones y utilidades adicionales para trabajar con cuerdas.

cors (^2.8.5): Un middleware de Express que permite la configuración de CORS (Cross-Origin Resource Sharing) en una aplicación web. Facilita el manejo de solicitudes de recursos desde diferentes dominios.

debug (~2.6.9): Una biblioteca de depuración para Node.js. Proporciona una forma sencilla de imprimir mensajes de depuración durante el desarrollo.

dotenv (^16.3.1): Una biblioteca para cargar variables de entorno desde archivos .env en una aplicación Node.js. Permite separar la configuración sensible de la lógica de la aplicación.

express (^4.18.2): Un marco de aplicaciones web rápido y minimalista para Node.js. Se utiliza para crear servidores web y enrutadores.

express-handlebars (^7.1.2): Un motor de plantillas para Express. Permite generar vistas dinámicas utilizando plantillas HTML.

express-session (^1.17.3): Un middleware de Express para el manejo de sesiones de usuario. Proporciona un mecanismo para almacenar y acceder a los datos de sesión en una aplicación web.

joi (^17.11.0): Una biblioteca de validación de objetos JavaScript. Se utiliza para validar y sanear los datos de entrada en una aplicación.

joi-password-complexity (^5.2.0): Una extensión de Joi para validar la complejidad de las contraseñas. Proporciona reglas para garantizar que las contraseñas sean lo suficientemente fuertes.

jsonwebtoken (^9.0.2): Una biblioteca para la generación y verificación de tokens JSON Web (JWT). Se utiliza para la autenticación y autorización en aplicaciones web.

mongodb (^6.2.0): Un controlador oficial de MongoDB para Node.js. Permite la conexión y manipulación de una base de datos MongoDB.

mongoose (^8.0.0): Una biblioteca de modelado de objetos MongoDB para Node.js. Proporciona una interfaz sencilla para interactuar con una base de datos MongoDB utilizando esquemas y modelos.

morgan (~1.9.1): Un middleware de Express para el registro de solicitudes HTTP. Registra información sobre las solicitudes entrantes en la consola o en un archivo de registro.

multer (^1.4.5-lts.1): Un middleware de Express para el manejo de carga de archivos. Se utiliza para procesar y almacenar archivos enviados a través de formularios HTML.

node-cron (^3.0.3): Una biblioteca para la programación de tareas cron en Node.js. Permite programar la ejecución de tareas en momentos específicos o en intervalos regulares.

nodemailer (^6.9.7): Una biblioteca para el envío de correos electrónicos desde una aplicación Node.js. Proporciona una interfaz sencilla para enviar correos electrónicos utilizando diferentes proveedores de servicios de correo.

path (^0.12.7): Un módulo de Node.js para manipular rutas de archivos y directorios. Proporciona utilidades para trabajar con rutas de forma segura y portátil.

sharp (^0.32.6): Una biblioteca de procesamiento de imágenes para Node.js. Se utiliza para redimensionar, recortar y realizar otras operaciones en imágenes de forma eficiente.

**DevDependencies:**

nodemon: Una herramienta que ayuda a desarrollar aplicaciones Node.js reiniciando automáticamente la aplicación cuando se detectan cambios en los archivos.
>>>>>>> repo-a/dev-v2

# **Autores:**

- José Escalona / C.I: 28.206.133
- Maikel Villegas Rojas / C.I: 30.302.836
- Luis Monsalve / C.I: 30.380.310
- José Camacho / C.I: 29.739.132
- Yetzenia Mendoa / C.I: 27.268.361

# **Enlaces:**

- Proyecto Backend en GitHub: [https://github.com/JMCA2805/Proyecto_FrontEnd_II_BackEnd]
- Proyecto FrontEnd en GitHub: [https://github.com/JMCA2805/Proyecto_FrontEnd_II]
- Figma: [https://www.figma.com/file/YMWbQcDfx51qsN8FE08QiS/Proyecto-Front-II?type=design&node-id=0%3A1&mode=design&t=9lseE5qu4bFVKZXq-1]

# **Muchas gracias por su atención**
<<<<<<< HEAD
=======

>>>>>>> repo-a/dev-v2
