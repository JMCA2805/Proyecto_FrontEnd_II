const { model, Schema } = require("mongoose");

const offersSchema = new Schema({
  icono: { data: Buffer, contentType: String },
  oferta: { type: String, required: true },
  descripcion: { type: String, required: true },
});

const Ofertas = model("Ofertas", offersSchema);

module.exports = Ofertas;