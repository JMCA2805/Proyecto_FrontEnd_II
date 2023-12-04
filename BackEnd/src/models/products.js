const {Schema, model} = require('mongoose');

const productoEsquema = new Schema({
    serial: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
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


const productos = model('productos', productoEsquema);

// Exportar el modelo de usuario
module.exports = productos;