const {Schema, model} = require('mongoose');

const favoritoschema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    id_prod: {
      type: String,
      required: true
  }  
},
{
    timestamps: true
});
const favoritos = model('favoritos', favoritoschema);

// Exportar el modelo de usuario
module.exports = favoritos;