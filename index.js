const express = require('express');

const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')
// crear una aplicacion de express
const app = express();
// helpers
const helpers = require('./helpers');

const session =  require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const flash = require('connect-flash');
require('dotenv').config({path:'variables.env'})

// Comprobamos conexion de la base de datos con sequelize
const db = require('./config/db');


require('./models/Proyectos')
require('./models/Tareas');
require('./models/Usuarios')


db.sync()
  .then(() => {  console.log('Conectado') })
  .catch(err => { console.log('No se conecto ' + err) })






// cargamos los archivos public 
app.use(express.static('public'))


// habilitar pug
app.set('view engine', 'pug')
// Aniadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))


// Habilitar Body - parse para la lectura de datos en el request 
app.use(bodyParser.urlencoded({extended:true}))


// cookie y sessiones

app.use(cookieParser())

app.use(session({
  secret:"superSecreto",
  resave:false,
  saveUninitialized:false

}))

// passport 
app.use(passport.initialize());
app.use(passport.session());


app.use(flash())

// helpers
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;

    next();
    
  })



// Separamos las rutas
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.POST || 3000;


app.listen(port, host,()=>{
  console.log('el server esta funcionando')
});
