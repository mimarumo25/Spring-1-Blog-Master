const API_URL = 'http://localhost:4001/movies';

const template = document.getElementById('template-card').content
const items = document.querySelector('#items')
const fragment = document.createDocumentFragment();
let modal_clear = document.querySelector('#modal-clear')
var myModalEl = document.getElementById('exampleModal')

const capturaDatos = async() => {
    let nombre = document.getElementById('inputnombre').value
    let urlImagen = document.getElementById('inputImagen').value
    let votos = document.getElementById('inputvotos').value
    let urlTrailer = document.getElementById('inputItrailer').value
    let descripcion = document.getElementById('textDescrpcion').value
    if (nombre === "" && urlImagen === "" && urlTrailer === "" && descripcion === "") {
        alert('Todos los datos son requeridos')
    } else {
        const array = { nombre, votos, urlImagen, urlTrailer, descripcion }
        let data = await axios.post(API_URL, array);

        if (data.status == 201) {
            alert('Datos guardados correctamente')
        } else {
            alert('Problemas al guardar los datos')
        }
    }

}
let btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener('click', (e) => {
    e.preventDefault()
    capturaDatos()
})
const getData = async() => {

    let datos = await axios.get(API_URL)
    let { data } = datos
    return data;
}
const pintarMovie = async() => {
    let data = await getData()
    data.forEach(m => {
        let { id, votos, urlImagen, urlTrailer, descripcion } = m;
        template.querySelector('img').setAttribute('src', urlImagen);
        template.querySelector('img').dataset.id = id;
        template.querySelector('p').textContent = votos;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment);
}
document.addEventListener('click', async(e) => {
    if (e.target.matches('.actualizar')) {
        let key = e.target.id

        let data = await getData()
        let actua = data.find(a => a.id === key)
        let { nombre, votos, urlImagen, urlTrailer, descripcion } = actua;
        document.getElementById('inputnombre').value = nombre
        document.getElementById('inputImagen').value = urlImagen
        document.getElementById('inputvotos').value = votos
        document.getElementById('inputItrailer').value = urlTrailer
        document.getElementById('textDescrpcion').value = descripcion
        document.getElementById('btnGuardar').setAttribute('hidden', '')
        document.getElementById('btnActualizar').setAttribute('name', key)
        document.getElementById('btnActualizar').removeAttribute('hidden')

    }
})
document.addEventListener('click', async(e) => {
    if (e.target.matches('.btnActualizar')) {
        e.preventDefault()
        let id = e.target.name
        let nombre = document.getElementById('inputnombre').value
        let urlImagen = document.getElementById('inputImagen').value
        let votos = document.getElementById('inputvotos').value
        let urlTrailer = document.getElementById('inputItrailer').value
        let descripcion = document.getElementById('textDescrpcion').value
        if (nombre === "" && urlImagen === "" && urlTrailer === "" && descripcion === "") {
            alert('Todos los datos son requeridos')
        } else {
            const array = { nombre, votos, urlImagen, urlTrailer, descripcion }
            let data = await axios.put(API_URL + '/' + id, array)
            if (resp.status === "oK") {
                alert('Los datos de actualizaron correctamente')
                document.getElementById('btnActualizar').setAttribute('hidden', '')
                document.getElementById('btnGuardar').removeAttribute('hidden')

            } else {
                alert('Fallo la actualizacion de los datos')
            }
        }
    }
})
document.addEventListener('click', async(e) => {
    if (e.target.matches('#Pelicula')) {
        let id = e.target.dataset.id
        let data = await getData()
        let result = data.find(r => r.id == id)
        let { nombre, votos, urlImagen, urlTrailer, descripcion } = result;
        document.querySelector('.imagen-modal').setAttribute('src', urlImagen)
        document.querySelector('.titulo-modal').textContent = nombre
        document.querySelector('.descripcion-modal').textContent = descripcion
        document.querySelector('.boton-trailer').setAttribute('id', urlTrailer)
        document.querySelector('.boton-modal_Aal').setAttribute('id', id)
        document.querySelector('.boton-modal-eliminar').setAttribute('id', id)
    }
})
document.addEventListener('click', (e) => {
    if (e.target.matches('.boton-trailer')) {
        let key = e.target.id
        modal_clear.innerHTML = '';
        modal_clear.innerHTML = `<iframe width="800" height="500" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    }
})
document.addEventListener('click', async(e) => {
    if (e.target.matches('.boton-modal-eliminar')) {
        let id = e.target.id
        let resp = await axios.delete(API_URL + '/' + id)
        if (resp.status === 'OK') {
            alert('Datos eliminados Correctamente')
        }

    }
})

myModalEl.addEventListener('hidden.bs.modal', function(event) {
    // do something...
    if (document.getElementById('modalModal') == null) {
        modal_clear.innerHTML = '';
        modal_clear.innerHTML = `<div class="modal-body">
        <div class="row">
            <div class="col-6">
                <img class="imagen-modal w-100 h-75" id="modalModal">
            </div>
            <div class="col-6">
                <div class="container">
                    <div class="text-center">
                        <h2 class="titulo-modal fw-bold"></h2>
                        <p class="descripcion-modal py-2 "></p>
                    </div>
                    <button type="button" class="btn btn-info boton-trailer py-2 verTrailer">Ver Trailer</button>
                    <button type="button" class="btn btn-primary boton-modal_Aal py-2 actualizar">Actualizar</button>
                    <button type="button" class="btn btn-danger boton-modal py-2 ">Eliminar</button>
                </div>
            </div>
        </div>
    </div>`
    }
})
document.addEventListener('DOMContentLoaded', pintarMovie)