const { model, Schema } = require("mongoose");

const ReseñasSchema = new Schema({
  tipo: { type: String, required: true },
  productoid: { type: String },
  productonombre: { type: String, required: true },
  nombre: { type: String, required: true },
  userid: { type: String, required: true },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: new Date() },
  imagenUser: { type: String},

});

const reseñas = model("Reseñas", ReseñasSchema);

module.exports = reseñas;
