// Importamos las dependencias necesarias
const validator = require('validator');
const Articulo = require("../models/Articulo");

// Controlador para pruebas
const pruebaDeControlador = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    });
};

// Controlador para la ruta del curso
const rutaDelCurso = (req, res) => {
    return res.status(200).json({
        mensaje: "Estoy en la ruta del curso"
    });
};

// Controlador para crear un nuevo artículo
const crearArticulo = async (req, res) => {
    // Recogemos los parámetros enviados por POST
    const parametros = req.body;

    // Validamos los datos enviados
    try {
        // Validamos que el título no esté vacío y tenga al menos 1 caracter
        const validarTitulo = !validator.isEmpty(parametros.titulo);
        // Validamos que el contenido no esté vacío
        const validarContenido = !validator.isEmpty(parametros.contenido);

        // Si alguna validación falla, lanzamos un error
        if (!validarTitulo || !validarContenido) {
            throw new Error("Datos inválidos");
        }
    } catch (error) {
        // Si ocurre un error en la validación, enviamos una respuesta de error
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Creamos un nuevo artículo usando los parámetros recibidos
    const articulo = new Articulo(parametros);

    try {
        // Guardamos el artículo en la base de datos
        const articuloGuardado = await articulo.save();

        // Si el guardado es exitoso, enviamos la respuesta con el artículo guardado
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo guardado correctamente",
            articulo: articuloGuardado
        });
    } catch (error) {
        // Si ocurre un error al guardar, enviamos una respuesta de error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al guardar el artículo"
        });
    }
};

// Controlador para listar todos los artículos
const listarArticulos = (req, res) => {
    // Buscamos todos los artículos en la base de datos
    Articulo.find({})
        .sort({ fecha: -1 }) // Ordenamos los artículos por fecha de forma descendente
        .then(articulos => {
            // Si la búsqueda es exitosa, enviamos la respuesta con la lista de artículos
            return res.status(200).json({
                cantidad: articulos.length,
                status: "success",
                articulos: articulos
            });
        })
        .catch(error => {
            // Si ocurre un error en la búsqueda, enviamos una respuesta de error
            return res.status(404).json({
                status: "error",
                mensaje: "No se pudo encontrar la lista de artículos"
            });
        });
};

// Controlador para listar un artículo por su ID
const obtenerArticuloPorId = (req, res) => {
    // Extraemos el ID de los parámetros de la URL
    const id = req.params.id;

    // Buscamos el artículo por su ID en la base de datos
    Articulo.findById(id)
        .then(articulo => {
            if (!articulo) {
                // Si no se encuentra el artículo, enviamos una respuesta de error
                return res.status(404).json({
                    status: "error",
                    mensaje: `No se pudo encontrar el artículo con el ID: ${id}`
                });
            }
            // Si el artículo es encontrado, enviamos la respuesta con el artículo
            return res.status(200).json({
                status: "success",
                articulo: articulo
            });
        })
        .catch(error => {
            // Si ocurre un error en la búsqueda, enviamos una respuesta de error
            return res.status(500).json({
                status: "error",
                mensaje: `Error al buscar el artículo con el ID: ${id}`
            });
        });
};

//Controlador para eliminar articulo por ID
const eliminarArticuloPorId = (req, res) => {
    // Extraemos el id de los parametros de la url
    const id = req.params.id;

    // Buscamos el articulo por su ID en la base de datos y lo eliminamos
    Articulo.findByIdAndDelete(id)
    .then(articuloID => {
        if (!articuloID) {
            // Si no se encuentra el articulo, devolvemos un error 404
            return res.status(404).json({
                status: "error",
                mensaje: "No se pudo encontrar el articulo"
            });
        }
        // Si encontramos y eliminamos el articulo, enviamos un mensaje de éxito
        return res.status(200).json({
            status: "success",
            mensaje: "Articulo eliminado exitosamente",
            articulo: articuloID
        });
    })
    .catch(error => {
        // Si ocurre un error al buscar o eliminar, enviamos una respuesta de error
        return res.status(400).json({
            status: "error",
            mensaje: "Error al buscar o eliminar el articulo",
            error: error.message
        });
    });
};


// Exportamos los controladores para que puedan ser usados en otras partes de la aplicación
module.exports = {
    pruebaDeControlador,
    rutaDelCurso,
    crearArticulo,
    listarArticulos,
    obtenerArticuloPorId,
    eliminarArticuloPorId,
};
