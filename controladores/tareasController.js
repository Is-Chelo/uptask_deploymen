const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.agregarTarea = async (req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })

    const { tarea } = req.body

    const estado = 0;
    const proyectoId = proyecto.id



    const respuesta = await Tareas.create({
        tarea,
        estado,
        proyectoId
    })

    if (!respuesta) {
        return next();
    }

    res.redirect(`/proyectos/${req.params.url}`)
}

exports.cambiarEstado = async (req, res, next)=>{
    const { id } = req.params
  
    const tarea = await Tareas.findOne({where:{ id:id }})
    
    let estado = 0 
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado 
    
    const respuesta = await tarea.save();
    
    if(!respuesta){
        return next();
    }

    res.status(200).send("Actualizado")
}


exports.eliminarTarea = async (req, res, next) =>{
    const { id } = req.params;
    
    const resultado = await Tareas.destroy({where:{id}});

    if(!resultado){
        return next();
    }
    res.status(200).send('Tarea Eliminada');
}