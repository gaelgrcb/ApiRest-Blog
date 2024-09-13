const express = require('express');
const router = express.Router();

const ArticuloControlador = require("../controllers/articulo");

//rutas de prueba
router.get('/ruta-prueba', ArticuloControlador.prueba);
router.get('/curso', ArticuloControlador.curso);

//ruta para articulos
router.post('/crear', ArticuloControlador.crear);
router.get('/listar',ArticuloControlador.listar);
router.get('/listar/:id', ArticuloControlador.uno);

module.exports = router;