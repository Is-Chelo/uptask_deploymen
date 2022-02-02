const express = require('express');

const router = express.Router();

const proyectoController = require('../controladores/proyectoController')
const tareasController = require('../controladores/tareasController')
const usuariosController = require('../controladores/usuarioController.js')
const authController = require('../controladores/authController')

const { body } = require('express-validator/check');

module.exports = function () {
    // creamos ruta para el home 
    router.get('/',
        authController.autentificado,
        proyectoController.home)


    // listamos los proyectos
    router.get('/nuevo-proyecto',
        authController.autentificado,
        proyectoController.formulario)

    // guardamos un proyecto y validamos con express validator 
    router.post('/nuevo-proyecto',
        authController.autentificado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto)

    // Actualizamos el proyecto
    router.get('/proyectos/:url',
        authController.autentificado,
        proyectoController.proyectoUrl)
    router.get('/proyecto/editar/:id',
        authController.autentificado,
        proyectoController.formularioEditar)
    router.post('/nuevo-proyecto/:id',
        authController.autentificado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto)

    // Eliminar el proyecto
    router.delete('/proyectos/:url',
        authController.autentificado,
        proyectoController.eliminarProyecto)



    // post tareas
    router.post('/proyectos/:url',
        authController.autentificado,
        body('tarea').not().isEmpty().trim().escape(),
        tareasController.agregarTarea)

    // Cambiamos el estado de la tarea
    router.patch('/tareas/:id',
        authController.autentificado,
        tareasController.cambiarEstado)

    // Eliminar tarea
    router.delete('/tareas/:id',
        authController.autentificado,
        tareasController.eliminarTarea)


    // Usuarios
    // formulario crear usuario 
    router.get('/crear-cuenta', usuariosController.formCrearUsuario)
    // crear usuario 
    router.post('/crear-cuenta',
        body('email').not().isEmpty().trim().escape(),
        usuariosController.crearCuenta)



    // Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.iniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario)
    // cerrar sesion 
    router.get('/cerrar-sesion', authController.cerrarSesion)


    // Reestablecer Contrasenia
    router.get('/reestablecer', usuariosController.formReestablecerPassword)
    router.post('/reestablecer', authController.enviarToken)
    router.get('/reestablecer/:token', authController.validarToken)
    router.post('/reestablecer/:token', authController.actualizarPassword)

    return router;
}