const Usuarios = require('../models/Usuarios')


exports.formCrearUsuario = (req, res)=>{
    
    res.render('formularioUsuario',{
        nombrePagina:"Crear Cuenta Uptask"
    })
} 


exports.crearCuenta = async (req, res, next)=>{
    const {email, password} = req.body

    try {
        const respuesta = await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion')
    } catch (error) {
        res.render('formularioUsuario',{
            nombrePagina:"Crear Cuenta Uptask",
            errores:error.errors,
            email,
            password
        })
        // console.log(error.errors)
    }

    
}


exports.iniciarSesion = (req, res)=>{
    res.render('iniciarSesion',{
        nombrePagina:"Iniciar Sesion en UpTask"
    })
}



exports.formReestablecerPassword = (req,res)=>{
    res.render('formReestablecerPassword',{
        nombrePagina:"Restablecer Contraseña"
    })
}