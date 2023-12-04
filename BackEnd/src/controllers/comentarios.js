const Comentarios = require("../models/comentarios");
const Usuario = require("../models/user.js");

const agregarComentario = async (req, res) => {
  try {
    const { id, tipo, nombre, comentario } = req.body;

    if (id) {
      Usuario.findById(id).then((usuario) => {
        if (!usuario) {
          return res.json({
            mensaje: "No se encontró ningún usuario con ese ID",
          });
        } else {
          let contentType;
          let imagenBuffer;
          if (usuario.imagen.data == null) {
            imagenBuffer = null;
            contentType = "";
          } else {
            imagenBuffer = usuario.imagen.data;
            contentType = usuario.imagen.contentType;
          }

          if (!comentario) {
            res.status(500).send({ Error: "Porfavor ingrese un comentario" });
            return;
          }

          const cmntr = {
            imagen: { data: imagenBuffer, contentType },
            tipo,
            nombre,
            comentario,
          };

          const nuevoComentario = new Comentarios(cmntr);

          nuevoComentario.save();

          res.status(200).send({ message: "¡Reseña Enviada con Exito!" });
        }
      });
    } else {
      res.json({ mensaje: "Estás enviando un ID incorrecto" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({ Error: "Error al enviar la reseña" });
  }
};

const getComentario = async (req, res) => {
  try {
    const getComentarios = await Comentarios.find({ tipo: "WebStore" })
      .sort({ _id: -1 })
      .limit(6);
    let imagenCompleta;
    let data;
    let cmntr = [];
    for (let i = 0; i < getComentarios.length; i++) {
      data = getComentarios[i].imagen.data;
      imagenCompleta =
        "data:" +
        getComentarios[i].imagen.contentType +
        ";base64," +
        data.toString("base64");

      cmntr[i] = {
        imagen: imagenCompleta,
        tipo: getComentarios[i].tipo,
        nombre: getComentarios[i].nombre,
        comentario: getComentarios[i].comentario,
      };
    }
    res.status(200).json(cmntr);
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Error al obtener las reseñas" });
  }
};


module.exports = {
  agregarComentario,
  getComentario,
};
