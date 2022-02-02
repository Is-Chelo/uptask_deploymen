const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// referencia la modelo donde queremos autentificar 
const Usuarios = require('../models/Usuarios')

// Local Strategy 
passport.use(
    new LocalStrategy(
        // Por defecto passport espera las columnas username y password pero podemos sobreescribirlo 
        {
            usernameField:'email',
            passwordField:'password'
        },

        // aqui verificamos las existencia de los parametros
        async function (email, password, done){
            try {
                const usuario = await Usuarios.findOne({
                    where:{
                        email:email                        
                    }
                })

                // si la contraseña esta mal
                if(!usuario.verificarPassword(password)){
                    done(null, false, {
                        message:'Password Incorrecto'
                    })
                }

                // si todo esta bien retornamos el usuario 
                return done(null, usuario)

            } catch (error) {
                // el usuario no existe
                done(null, false, {
                    message:'Esta cuenta no existe'
                })
            }
        }

    )
)



// serealizamos el usuario 
passport.serializeUser((usuario, callback)=>{
    callback(null,usuario)
})



// deserealizamos el usuario 
passport.deserializeUser((usuario, callack)=>{
    callack(null,usuario);
})


module.exports = passport