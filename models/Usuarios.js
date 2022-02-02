const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos')
const bcrypt = require('bcrypt-nodejs');
const Usuarios = db.define('usuarios', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:Sequelize.STRING(60),
        allowNull:false, // no puede ir vacio,
        unique: {
            args:true,
            msg:"Usuario Registrado"
        },
        validate:{
            isEmail: {
                msg:"Debe Introducir un correo valido"
            },
            notEmpty:{
                msg:"El e-mail no debe ser vacio"
            }   
        }
    },
    password:{
        type:Sequelize.STRING(60),
        allowNull:false, // no puede ir vacio
        validate:{
            notEmpty:{
                msg:"El password no debe ser vacio"
            } 
        }
    },
    token:Sequelize.STRING,
    expiracion:Sequelize.DATE

},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})

// Metodo personalizado
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}




Usuarios.hasMany(Proyectos)

module.exports = Usuarios