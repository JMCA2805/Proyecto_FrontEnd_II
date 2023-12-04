//Esquema de Datos de Ofertas y descuentos

//get schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Ofertas_Listar:
 *       type: object
 *       properties:
 *         icono:
 *           type: string
 *           description: Imagen de la oferta o descuento (Buffer - String)
 *         oferta:
 *           type: string
 *           description: Nombre de la oferta o Descuento
 *         descripcion:
 *           type: string
 *           description: Descripcion de la oferta o descuento
 *       example:
 *         icono: "data:codigo de la imagen en bite"
 *         oferta: "15% de descuento en telefonos"
 *         descripcion: "Aprovecha un descuento del 15% con la compra de 2 telefonos"
 */

//get

/**
 * @swagger
 * /offers/:
 *   get:
 *     summary: Listar las ofertas existente
 *     tags: [Ofertas y Descuentos]
 *     responses:
 *       200:
 *         description: Ofertas o Descuentos Registrados
 *       400:
 *         description: No hay Ofertas o Descuentos existente
 */

// POST schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Ofertas_Crear:
 *       type: object
 *       properties:
 *         icono:
 *           type: string
 *           description: Imagen de la oferta o descuento (Buffer - String)
 *         oferta:
 *           type: string
 *           description: Nombre de la oferta o Descuento
 *         descripcion:
 *           type: string
 *           description: Descripcion de la oferta o descuento
 *       required:
 *         -icono
 *         -oferta
 *         -descripcion
 *       example:
 *         icono: "data:codigo de la imagen en bite"
 *         oferta: "15% de descuento en telefonos"
 *         descripcion: "Aprovecha un descuento del 15% con la compra de 2 telefonos"
 */

/**
 * @swagger
 * /offers/addoff:
 *   post:
 *     summary: Registrar una oferta o descuento
 *     tags: [Ofertas y Descuentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Ofertas_Crear'
 *     responses:
 *       200:
 *         description: Oferta o Descuento Registrado
 *       400:
 *         description: Oferta o Descuento ya Registrado (Existente)
 */

//put schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Ofertas_Actualizar:
 *       type: object
 *       properties:
 *         viejo:
 *           type: string
 *           description: Nombre de la oferta o Descuento a actualizar
 *         icono:
 *           type: string
 *           description: Imagen de la oferta o descuento nuevo (Buffer - String)
 *         oferta:
 *           type: string
 *           description: Nombre de la oferta o Descuento nuevo
 *         descripcion:
 *           type: string
 *           description: Descripcion de la oferta o descuento nuevo
 *       example:
 *         viejo: "Descuento del 20% en ordenadores portátiles "
 *         icono: "data:codigo de la imagen en bite"
 *         oferta: "Descuento del 15% en ordenadores portátiles"
 *         descripcion: "Ahorra un 15% en la compra de cualquier ordenador portátil de nuestra "
 */

//PUT

/**
 * @swagger
 * /offers/editoff:
 *   put:
 *     summary: Actualizar La Oferta o Descuento
 *     tags: [Ofertas y Descuentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Ofertas_Actualizar'
 *     responses:
 *       200:
 *         description: Oferta o Descuento Actualizado
 *       400:
 *         description: Error al actualizar la Oferta o Descuento
 */

// Delete schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Ofertas_Eliminar:
 *       type: object
 *       properties:
 *         oferta:
 *           type: string
 *           description: Nombre de la oferta o Descuento nuevo
 *       required:
 *         -oferta
 *       example:
 *         oferta: "Regalo de una tablet con la compra de un televisor"
 */

// Delete
/**
 * @swagger
 * /offers/deloff:
 *   delete:
 *     summary: Eliminar una oferta o descuento
 *     tags: [Ofertas y Descuentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Ofertas_Eliminar'
 *     responses:
 *       200:
 *         description: Oferta o descuento Eliminado
 *       400:
 *         description: La oferta o decuento no existe
 */






//Esquema de Datos de Ofertas y descuentos

//get schema

/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       properties:
 *         correo:
 *           type: string
 *           description: Correo para iniciar sesion
 *         contraseña:
 *           type: string
 *           description: Password para iniciar sesion
 *       example:
 *         correo: "yetzeniam7@gmail.com"
 *         contraseña: "S1ncero."
 */

//get

/**
 * @swagger
 * /auth/users/:
 *   get:
 *     summary: Iniciar sesion
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuario logeado correctamente"
 *       400:
 *         description: Contraseña incorrecta
 */

// POST schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Ingrese su nombre
 *         apellido:
 *           type: string
 *           description: Ingrese su apellido
 *         correo:
 *           type: string
 *           description: Ingrese su correo
 *         contraseña:
 *           type: string
 *           description: Ingrese su contraseña
 *       required:
 *         -correo
 *         -contraseña
 *       example:
 *         nombre: "Yetzenia"
 *         apellido: "Mendoza"
 *         correo: "yetzenia@gmail.com"
 *         contraseña: "1234"
 */

/**
 * @swagger
 * /auth/register/:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Usuario Creado
 *       400:
 *         description: Verifique su información
 */

//put schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Ofertas_Actualizar:
 *       type: object
 *       properties:
 *         viejo:
 *           type: string
 *           description: Nombre de la oferta o Descuento a actualizar
 *         icono:
 *           type: string
 *           description: Imagen de la oferta o descuento nuevo (Buffer - String)
 *         oferta:
 *           type: string
 *           description: Nombre de la oferta o Descuento nuevo
 *         descripcion:
 *           type: string
 *           description: Descripcion de la oferta o descuento nuevo
 *       example:
 *         viejo: "Descuento del 20% en ordenadores portátiles "
 *         icono: "data:codigo de la imagen en bite"
 *         oferta: "Descuento del 15% en ordenadores portátiles"
 *         descripcion: "Ahorra un 15% en la compra de cualquier ordenador portátil de nuestra "
 */
