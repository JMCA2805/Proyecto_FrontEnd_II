const { json } = require("body-parser");
const articulos = require("../models/articulos");

class articulosController {
  // Controlador para guardar un nuevo artículo
  agregarArticulo = async (req, res) => {
    try {
      const { titulo, texto } = req.body;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;

      const tituloArticulos = await articulos.findOne({ titulo });

      if (tituloArticulos) {
        res.status(400).send("Publicación ya registrada");
      } else {
        const nuevoarticulo = new articulos({
          titulo,
          texto,
          imagen: { data: imagenBuffer, contentType },
        });
        await nuevoarticulo.save();
        res.status(201).send("Producto agregado correctamente");
      }
    } catch (error) {
      console.error("Error al agregar articulos:", error);
      res.status(500).json({ Error: "Error al agregar articulos" });
    }
  };

  obtenerArticulos = async (req, res) => {
    try {
      const articulosscom = await articulos.find();
      let imagenCompleta;
      let data;
      let articuloss = [];

      for (let i = 0; i < articulosscom.length; i++) {
        data = articulosscom[i].imagen.data;
        imagenCompleta =
          "data:" +
          articulosscom[i].imagen.contentType +
          ";base64," +
          data.toString("base64");

        articuloss[i] = {
          titulo: articulosscom[i].titulo,
          texto: articulosscom[i].texto,
          imagen: imagenCompleta,
        };
      }

      if (articuloss.length === 0) {
        res.status(200).send("No hay articuloss en la Base de Datos");
      } else {
        res.status(200).json(articuloss);
      }
    } catch (error) {
      res.status(500).json({ Error: "Error al obtener articuloss" });
    }
  };

  editarArticulo = async (req, res) => {
    try {
      const { titulo, texto, tituloviejo} = req.body;
  
      const imagenBuffer = req.file ? req.file.buffer : undefined;
      const contentType = req.file ? req.file.mimetype : undefined;

  
      const articulo = await articulos.findOne({ titulo: tituloviejo });
      
  
      if (!articulo) {
        return res.status(404).json({ mensaje: "Articulo no encontrado" });
      }
  
      // Elimina la imagen existente del sistema de archivos
  
      // Actualiza los datos del artículo
      if (titulo) {
        articulo.titulo = titulo;
      }
      if (texto) {
        articulo.texto = texto;
      }
      if (imagenBuffer && contentType) {
        articulo.imagen = { data: imagenBuffer, contentType };
      }
  
      await articulo.save();


      const imagenCompleta =
      "data:" + articulo.imagen.contentType + ";base64," + articulo.imagen.data.toString("base64");
  
      res.json({ mensaje: "Articulo editado correctamente", imagen: imagenCompleta });
    } catch (error) {
      console.error("Error al editar el articulo", error);
      res.status(500).json({ mensaje: "Error al editar el articulo" });
    }
  };

  eliminarArticulo = async (req, res) => {
    try {
      const titulo = req.body.titulo;

      const articulo = await articulos.findOne({ titulo: titulo });
      if (!articulo) {
        return res.status(404).json({ mensaje: 'articulos no encontrado' });
      }

      await articulos.deleteOne({'titulo': titulo});

      res.json({ mensaje: 'Producto eliminado correctamente' });
      
    } catch (error) {
      console.error('Error al eliminar el articulo', error);
      res.status(500).json({ mensaje: 'Error al eliminar el articulo' });
    }
  };
}

const articulosC = new articulosController();

module.exports = articulosC;
