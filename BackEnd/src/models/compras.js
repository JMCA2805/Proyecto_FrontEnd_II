const { model, Schema } = require("mongoose");

const comprasSchema = new Schema({
  idUser: { type: String, required: true },
  nombre: { type: String, required: true },
  factura: {type: String, required: true},
  productos: {type: Array, required: true},
  monto_total: {type: Number, required: true},
  fecha_compra: {type: String, required: true},
});

const Compras = model("Compras", comprasSchema);

module.exports = Compras