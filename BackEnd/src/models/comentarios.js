const { model, Schema } = require("mongoose");

const ComentarioSchema = new Schema({
  imagen: {data: Buffer, contentType: String },
  tipo: { type: String, required: true },
  nombre: { type: String, required: true },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: new Date() },
});

const comentarios = model("Comentarios", ComentarioSchema);

module.exports = comentarios;
