const Usuario = require("../models/user.js");

class usuariosController {
  obtenerUsuarios = async (req, res) => {
    try {
      const usuariosCompletos = await Usuario.find();
      let usuarios = [];

      for (let i = 0; i < usuariosCompletos.length; i++) {
        const usuario = {
          nombre: usuariosCompletos[i].nombre,
          apellido: usuariosCompletos[i].apellido,
          correo: usuariosCompletos[i].correo,
          contraseña: usuariosCompletos[i].contraseña,
          descripcion: usuariosCompletos[i].descripcion,
          telefono: usuariosCompletos[i].telefono,
        };


        usuarios.push(usuario);
      }

      if (usuarios.length === 0) {
        res.status(200).send("No hay usuarios en la Base de Datos");
      } else {
        res.status(200).json(usuarios);
      }
    } catch (error) {
      res.status(500).json({ Error: "Error al obtener usuarios" });
    }
  };
  
  editarFoto = async (req, res) => {
    try {
      const id = req.params.id;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;
      const usuario = await Usuario.findOne({ _id: id });
      const imagen = { data: imagenBuffer, contentType }

      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      await Usuario.findByIdAndUpdate(req.params.id, { imagen }, { new: true });

      res.send({ mensaje: "Foto editada correctamente" });
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      res.status(500).json({ mensaje: "Error al editar el usuario" });
    }
  };

  editarUsuario = async (req, res) => {
    try {
      const { correo, datosActualizados } = req.body;
      const usuario = await Usuario.findOne({ correo });

      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      await Usuario.findOneAndUpdate({ correo }, datosActualizados, {
        new: true,
      });

      res.json({ mensaje: "Usuario editado correctamente" });
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      res.status(500).json({ mensaje: "Error al editar el usuario" });
    }
  };

  editarUsuarioPerfil= async (req, res) => {
    try {
      const { id, datosActualizados } = req.body;
      const usuario = await Usuario.findOne({_id: id});
      console.log(usuario)



      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      await Usuario.findOneAndUpdate({ _id: id }, datosActualizados, {
        new: true,
      });

      res.json({ mensaje: "Usuario editado correctamente" });
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      res.status(500).json({ mensaje: "Error al editar el usuario" });
    }
  };

  eliminarUsuario = async (req, res) => {
    try {
      const correo = req.body.correo;

      const usuario = await Usuario.findOne({ correo: correo });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      await Usuario.deleteOne({'correo': correo});

      res.json({ mensaje: 'Producto eliminado correctamente' });
      
    } catch (error) {
      console.error('Error al eliminar el Usuario', error);
      res.status(500).json({ mensaje: 'Error al eliminar el Usuario' });
    }
  };

  obtenerUsuariosId = async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuario.findOne({ _id: id });

      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      res.send(usuario);
      
    } catch (error) {
      console.error('Error al eliminar el Usuario', error);
      res.status(500).json({ mensaje: 'Error al eliminar el Usuario' });
    }
  }
}

const usuariosC = new usuariosController();

module.exports = usuariosC;
