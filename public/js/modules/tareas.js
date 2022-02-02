import axios from "axios";
import Swal from "sweetalert2";
import {avanceProyecto} from '../funciones/barraavance';

const tareas = document.querySelector('.listado-pendientes');


if (tareas) {
    tareas.addEventListener('click', e => {
        const icono = e.target
        const idTarea = icono.parentElement.parentElement.dataset.tarea
        
        if (e.target.classList.contains('icono')) {

            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(respuesta => {
                    if (respuesta.status === 200) {
                        window.location.href = `${location.origin}${location.pathname}`
                    }

                })
                .catch(e => console.log(e))

        }
        if (e.target.classList.contains('eliminar')) {
            const tareaHTML = icono.parentElement.parentElement
            // console.log(url)
            Swal.fire({
                title: 'Deseas eliminar esta tarea?',
                text: "La tarea eliminada no podra ser recuperada",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'No, Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, {params:{ idTarea }})
                        .then(res => {
                            if(res.status === 200){
                                Swal.fire(
                                    'Tarea Eliminada!',
                                    'Tu archivo se ha eliminado',
                                    'success'
                                )
                                tareaHTML.parentElement.removeChild(tareaHTML)
                            } 
                            
                            avanceProyecto();
                        })
                        .catch(e => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error...',
                                text: 'No se pudo eliminar'
                              })
                            console.log(e)
                        })
                    
                }
            })


        }
    })
}

export default tareas;