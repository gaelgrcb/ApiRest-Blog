const validator = require('validator');
const Articulo = require("../models/Articulo");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    });
}

const curso = (req, res) => {
    return res.status(200).json({
        mensaje: "Estoy en la ruta del curso"
    });
}

// Convertimos la función 'crear' en asincrónica para usar 'await'
const crear = async (req, res) => {
    // Recoger parámetros por POST para guardar
    let parametros = req.body;

    // Validar los datos
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 0, max: undefined });
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("Datos inválidos"); // Lanzamos un error si los datos no son válidos
        }
    } catch (error) {
        // Capturamos cualquier error de validación
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Crear el objeto a guardar (Mongoose crea automáticamente el objeto basado en el modelo)
    const articulo = new Articulo(parametros);

    try {
        // Guardar el artículo en la base de datos
        // Esperamos a que la promesa se resuelva con 'await'
        const articuloGuardado = await articulo.save();

        // Enviamos un mensaje de éxito si el artículo se guarda correctamente
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo guardado correctamente",
            articulo: articuloGuardado
        });
    } catch (error) {
        // Si ocurre un error al guardar, lo capturamos aquí
        return res.status(400).json({
            status: "error",
            mensaje: "Error al guardar el artículo"
        });
    }
}


//Pedir listar los articulos de la base de datos
const listar= (req, res) => {
    
    Articulo.find({}) //Find ayuda a buscar los datos en la base de datos
        .sort({ fecha: -1 }) // Ordenamos los artículos por fecha del mas nuevo al mas viejo
        .then(articulos => {
            return res.status(200).json({
                cantidad: articulos.length ,
                status:"success",
                articulos: articulos
            })
        })

        .catch(error => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se pudo encontar la lista de articulos"
            })
        })

}

//Listar por id

    const uno = (req, res) => {
    const id = req.params.id;

    Articulo.findById(id)
       .then(articulo => {
            if (!articulo) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se pudo encontrar el articulo con el id: " + id
                });
            }
            return res.status(200).json({
                status: "success",
                articulo: articulo
            });
        })
       .catch(error => {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al buscar el articulo con el id: " + id
            });
        });
}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
}
