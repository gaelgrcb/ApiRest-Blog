// Importa el módulo "mongoose", que se utiliza para interactuar con MongoDB desde Node.js
const mongoose = require("mongoose");

// Define una función asincrónica llamada "conexion" que intentará conectarse a la base de datos MongoDB
const conexion = async () => {

    try {

        // Intentamos conectarnos a la base de datos "mi_blog" en el servidor MongoDB local (localhost)
        await mongoose.connect("mongodb://localhost:27017/mi_blog");
        console.log("Conectado a la base de datos mi_blog!!");

    } catch (error) {
        
        // Si ocurre algún error durante la conexión, se captura aquí y se imprime en la consola
        console.log(error);
        
        // Se lanza un error para indicar que no se pudo conectar a la base de datos
        throw new Error("No se pudo conectar a la base de datos");
    }
}

// Exporta la función "conexion" para que pueda ser utilizada en otros archivos de Node.js
module.exports = {
    conexion
}
