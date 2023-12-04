const bcrypt = require("bcrypt");
const Usuario = require("../models/user.js");

const register = async (req, res) => {
  const { nombre, apellido, correo, contraseña } = req.body;

  Usuario.findOne({ correo }).then((usuario) => {
    if (usuario) {
      if (usuario) return res.status(400).json({ error: "Email already exit" });
    } else if (!nombre || !apellido || !correo || !contraseña) {
      return res.json({ mensaje: "Falta el nombre / apellido / correo / contraseña" });
    } else {
      bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
        if (error) res.json({ error });
        else {
          const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            correo,
            contraseña: contraseñaHasheada,
            rol: 'usuario',
            imagen: {data: null, contentType: ""},
            telefono: null,
            descripcion: "",
            carrito: [],
            compras: []
          });

          nuevoUsuario
            .save()
            .then((usuario) => {
              res.json({ mensaje: "Usuario creado correctamente", usuario });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
};

module.exports = register;