const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const VIDEO_API1 = 'https://api.themoviedb.org/3/movie/'
const VIDEO_API2 = '/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language='
const apiBusqueda = 'https://api.themoviedb.org/3/movie/'
const apiBusqueda1 = '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`'

let h1 = document.querySelector('h1');
let img = document.getElementById('imgD');
let boton = document.querySelector('.btn-dark');
let p = document.querySelector('p');
let body = document.getElementById('body');
let trailerB = document.getElementById('trailer');
let video = document.querySelector('#video');
let lenguaje = 'es-MX';
let cont = 0;

const getDatosMovie = async() => {

    let idB = JSON.parse(localStorage.getItem('idDetalle'));


    const movieId = await axios.get(apiBusqueda + idB + apiBusqueda1)
    let { data } = movieId
    const { backdrop_path: fondo, poster_path, overview: describe, title, id } = data;
    body.style.backgroundImage = `url(${IMG_PATH +fondo})`;
    h1.textContent = title
    p.textContent = describe
    img.setAttribute('src', IMG_PATH + poster_path);
    getTrailer(idB)
}
const getTrailer = async(id) => {
    let trailer = await axios.get(VIDEO_API1 + id + VIDEO_API2 + lenguaje)
    var { data } = trailer
    var { results } = data
    if (results.length == 0) {

        lenguaje = 'en-EN'
        let trailer = await axios.get(VIDEO_API1 + id + VIDEO_API2 + lenguaje)
        var { data } = trailer
        var { results } = data
    }
    logadinTrue()
    trailerB.innerHTML = ''

    results.forEach(trailer => {
        let { key } = trailer
        trailerB.innerHTML += `<button type="submit" id="${key}"class="btn btn-primary btn-lg m-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-play"></i> Ver
        Trailer ${cont+=1}</button>`;
    });
}
const logadinTrue = () => {
    let loading = document.getElementById('loading')
    loading.setAttribute('hidden', "")
    document.getElementById('detalles').removeAttribute('hidden')

}


document.addEventListener('DOMContentLoaded', getDatosMovie)

boton.addEventListener('click', () => {
    window.location.href = 'index.html';
})

trailerB.addEventListener('click', (e) => {
    video.innerHTML = ''
    if (e.target.classList.contains('btn-primary')) {

        const key = e.target.id

        video.innerHTML = `  <iframe width="800" height="500" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe> `
    }
})