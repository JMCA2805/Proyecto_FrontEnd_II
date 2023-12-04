const Usuario = require("../models/user.js");

const getUserById = async (req, res) => {
  const { id } = req.params; // Accede al ID de usuario desde los parámetros de la ruta

  if (id) {
    Usuario.findById(id).then((usuario) => {
      if (!usuario) {
        return res.json({
          mensaje: "No se encontró ningún usuario con ese ID",
        });
      } else {
        let imagenCompleta;
        let data
        if(usuario.imagen.data == null){
          imagenCompleta = '../public/usuario.png' 
        }else{
          data = usuario.imagen.data;
          imagenCompleta ="data:" +usuario.imagen.contentType +";base64," + data.toString("base64");
        }



        const enviarPerfil = {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          telefono: usuario.telefono,
          correo: usuario.correo,
          imagen: imagenCompleta,
          descripcion: usuario.descripcion
        }


        res.json(enviarPerfil);
      }
    });
  } else {
    res.json({ mensaje: "Estás enviando un ID incorrecto" });
  }
};

module.exports = getUserById;