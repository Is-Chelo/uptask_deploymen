const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


// Controlador 

exports.home = async (req, res)=>{
    const usuarioId= res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where:{usuarioId}});

    res.render("index",{
        nombrePagina:"Proyectos",
        proyectos
    })
}

exports.formulario = async(req, res)=>{
    const usuarioId= res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where:{usuarioId}});

    res.render("nuevoProyecto", {
        nombrePagina:"Nuevo Proyecto",
        proyectos
    })
}

exports.nuevoProyecto = async (req, res)=>{
    const usuarioId= res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where:{usuarioId}});

    // console.log(req.body)
    // res.send("Enviaste el formulario")
    
    const { nombre } = req.body;
    
    let errores =[]

    if(!nombre){
        errores.push({'texto':"El campo se encuentra vacio"})
    }

    if(errores.length>0){
        res.render("nuevoProyecto", {
            nombrePagina:"Nuevo Proyecto",
            errores:errores,
            proyectos
        })
    }else{
        // guardamos en la base  de datos
        const usuarioId = res.locals.usuario.id
        const respuesta = await Proyectos.create({nombre, usuarioId})
        res.redirect('/')
       
    }

}

exports.proyectoUrl = async (req, res,next)=>{
    const usuarioId = res.locals.usuario.id
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where:{
            url : req.params.url,
            usuarioId
        }
    })

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    const tareas = await Tareas.findAll({
        where:{
            proyectoId:proyecto.id
        },
        // include:[
        //     {model:Proyectos}
        // ]
})


    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar= async (req,res)=>{
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where:{
            id:req.params.id
        }
    })

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
        nombrePagina:"Editar Proyecto",
        proyectos,
        proyecto
    })
}


exports.actualizarProyecto = async (req, res)=>{
    const proyectos = await Proyectos.findAll();
    
    
    const { nombre } = req.body;
    
    let errores =[]

    if(!nombre){
        errores.push({'texto':"El campo se encuentra vacio"})
    }

    if(errores.length>0){
        res.render("nuevoProyecto", {
            nombrePagina:"Nuevo Proyecto",
            errores:errores,
            proyectos
        })
    }else{
        // guardamos en la base  de datos
         
        Proyectos.update(
            {nombre},
            {where:{id:req.params.id}})
        res.redirect('/')
       
    }

}

exports.eliminarProyecto = async(req, res, next)=>{
    // se puede usar query o params 

    const { proyectoUrl } = req.query;

    const respuesta = await Proyectos.destroy({where:{
        url : proyectoUrl
    }})

    if(!respuesta){
        return next();
    }

    res.send("El proyecto se elimino");

}