const {Schema, model} = require('mongoose');

const articuloEsquema = new Schema({

    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    }
},
{
    timestamps: true
});


const articulos = model('articulos', articuloEsquema);

// Exportar el modelo de usuario
module.exports = articulos;