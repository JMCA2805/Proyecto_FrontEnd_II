const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: {type: String, required: true},
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  descripcion: { type: String },
  telefono: {type: Number},
  carrito: {type: Array},
  compras: {type: Array},

  imagen: {data: Buffer, contentType: String },
  rol: {type: String, required: true}
});

const usuarios = model("Usuario", UsuarioSchema);

module.exports = usuarios