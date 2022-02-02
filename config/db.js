const Sequelize = require('sequelize')
// extramos las variables globales
require('dotenv').config({path:'variables.env'})

// const db = new Sequelize('uptasknode', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
  
//   port: '3306',

//   define:{
//       timestamps:false
//   }
// })

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD, {
  host: process.env.BD_HOST,
  dialect: 'mysql',
  
  port: process.env.BD_PORT,

  define:{
      timestamps:false
  }
})


module.exports = db;