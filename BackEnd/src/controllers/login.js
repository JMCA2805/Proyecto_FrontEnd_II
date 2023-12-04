const bcrypt = require("bcrypt");
const Usuario = require("../models/user.js");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  const clave = process.env.JWTPRIVATEKEY

  Usuario.findOne({ correo }).then((usuario) => {
    if (!usuario) {
      return res.json({ mensaje: "Usuario no encontrado" });
    }

    bcrypt.compare(contraseña, usuario.contraseña).then((esCorrecta) => {
      if (esCorrecta) {
        const { id, nombre, rol } = usuario;

        const data = {
          id,
          nombre,
          rol,
        };

        const token = jwt.sign(data, clave, {
          expiresIn: 86400 /* 24hs */,
        });

        res.json({
          mensaje: "Usuario logeado correctamente",
          usuario: {
            id,
            nombre,
            rol,
            token,
          },
        });
      } else {
        return res.json({ mensaje: "Contraseña incorrecta" });
      }
    });
  });
};

module.exports = login;