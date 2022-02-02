import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.getElementById('eliminar-proyectos')

if (btnEliminar) {

    btnEliminar.addEventListener('click', (e) => {
        const proyectoUrl = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Deseas Eliminar este Proyecto',
            text: "Un Proyecto eliminado no puede ser Recuperado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelmButtonText: 'No, Cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviamos la peticion con axios
                const url = `${location.origin}/proyectos/${proyectoUrl}`;
                axios.delete(url, {params: { proyectoUrl } })
                    .then(respuesta => {
                        Swal.fire(
                            'Proyecto Eliminado!',
                            'El proyecto se Elimino.',
                            'success'
                        )
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un Error',
                            text: "No se pudo eliminar el Proyecto",
                            icon: 'error',
                        })
                    )


            }
        })
    })

}

export default btnEliminar