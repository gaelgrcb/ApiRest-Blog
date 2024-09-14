const express = require('express');
const router = express.Router();

const ArticuloControlador = require("../controllers/articulo");

//rutas de prueba
router.get('/ruta-prueba', ArticuloControlador.pruebaDeControlador);
router.get('/curso', ArticuloControlador.rutaDelCurso);

//ruta para articulos
router.post('/crear', ArticuloControlador.crearArticulo);
router.get('/listar',ArticuloControlador.listarArticulos);
router.get('/listar/:id', ArticuloControlador.obtenerArticuloPorId);

module.exports = router;