//importamos mongoose y los metodos de Schema y model
const { Schema, model } = require('mongoose');

//creamos el esqueleto del articulo
const ArticuloSchema = Schema({
    titulo:{
        type: String,
        required: true
    },
    contenido:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    imagen:{
        type: String,
        default: 'default.png'
    }
});

//exportamos el modelo para reutilizarlo en diferentes partes del codigo
//indica a que coleccion esta conectado el modelo para comenzar a ingresar datos
module.exports = model('Articulo', ArticuloSchema, 'articulos'); 