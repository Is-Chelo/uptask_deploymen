const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tarea:Sequelize.STRING(100),
    estado:Sequelize.INTEGER(1)

})
// Una tarea pertenece a un proyecto
Tareas.belongsTo(Proyectos);


// un proyecto puede tener muchas tareas
// Proyectos.hasMany(Tareas)

module.exports = Tareas