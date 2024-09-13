const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");


console.log("Iniciando conexion....");

conexion();

//crear servidor de node

const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

//convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//crear rutas
const rutas_articulo = require('./routes/articulo');

//usar rutas
app.use("/api", rutas_articulo);

//crear servidor y escuhar peticiones http
app.listen(puerto, () =>{
    console.log("Servidor corriendo en el puerto: "+puerto);
})