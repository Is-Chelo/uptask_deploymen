const passport = require('passport');
const Usuario = require('../models/Usuarios')
const crypto = require('crypto')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true
})


exports.autentificado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/iniciar-sesion')

}



exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion')
    })
}




// restablacer una contrasenia 
exports.enviarToken = async (req, res) => {
    // verificar si el usuario existe 
    const { email } = req.body
    let errores = []

    const usuario = await Usuario.findOne({
        where: {
            email
        }
    })
    // Si no existe el usuario
    if (!usuario) {
        errores.push({ message: "El usuario no existe" })
        res.render('formReestablecerPassword', {
            nombrePagina: "Restablecer Contraseña",
            errores
        })
    }

    // Si existe el usuario generamos un token
    usuario.token = crypto.randomBytes(20).toString('hex')
    usuario.expiracion = Date.now() + 3600000

    // guardamos con save 
    await usuario.save();


    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`

    res.redirect(resetUrl);
    // console.log(resetUrl)
}



exports.validarToken = async (req, res) => {
    const usuario = Usuario.findOne({
        where: {
            token: req.params.token
        }
    })

    // si el usuario no existe 
    if (!usuario) {
        res.render('/reestablecer', {
            nombrePagina: "Restablecer Contraseña",
            errores: [{ message: "Usuario no Valido" }]
        })
    }

    // si todo esta bien mandamos a otra vista 
    res.render('resetPassword', {
        nombrePagina: "Reestablecer Contraseña"
    })

}



exports.actualizarPassword = async (req, res) => {

    // verificar si existe el usuario CON EL TOKEN pero tambien se verifica que no haya expirado 
    const usuario = await Usuario.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now(),   //expiracion >= Date.now
            }
        }
    })

    // 
    if (!usuario) {
        res.render('/reestablecer', {
            nombrePagina: "Restablecer Contraseña",
            errores: [{ message: "Usuario no Valido" }]
        })
    }

    

    // guardamos 
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); 
    usuario.token=null,
    usuario.expiracion=null;
    console.log(usuario.password);
    await usuario.save();

    res.redirect('/iniciar-sesion')
}