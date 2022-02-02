import Swal from "sweetalert2";

export const avanceProyecto = () => {
    // selecciona tareas
    const tareas = document.querySelectorAll('.tarea')

    if (tareas.length) {

        // seleccionar tareas completas
        const tareasCompletas = document.querySelectorAll('.completo');

        // calcular porcentaje 
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100)

        // mostrar porcentaje 
        const porcentaje = document.getElementById('porcentaje')
        porcentaje.style.width = avance + '%';

        if (avance === 100) {
            Swal.fire(
                'Proyecto Completo!',
                'Genial el proyecto por fin se terminó!',
                'success'
            )
        }
    }

}