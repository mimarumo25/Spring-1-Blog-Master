import { Valoradas } from "./valoracion.js";


const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const MAS_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const MENOSURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const MAS_URL2 = '&vote_count.gte=1000&language=es-ES'

const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const buscar = document.getElementById("form")
const search = document.getElementById('search')
const masValorada = document.getElementById('masValoradas');
const menosValorada = document.getElementById('menosValoradas');
let mas = false
let menos = false
let buscador = false
let limpiarMas = false
let limpiarMenos = false
let limpiar = false

const getPeliculas = async(url) => {

    try {
        const peticion = await fetch(url);
        const pelicula = await peticion.json();
        const { results } = pelicula;
        pintarPelicula(results);

    } catch (error) {
        console.log(error)
    }
}
const getPeliculasMas = async(url) => {

    try {
        const peticion = await fetch(url);
        const pelicula = await peticion.json();
        const { results } = pelicula;
        pintarPeliculaMas(results);

    } catch (error) {
        console.log(error)
    }
}



const pintarPeliculaMas = (peliculas) => {
    if (limpiarMas === false) {
        items.innerHTML = ""
        console.log(limpiarMas);
    }
    if (limpiarMenos === false) {
        items.innerHTML = ""
        console.log(limpiarMenos);
    }
    if (limpiar === true) {
        items.innerHTML = ""
        limpiar = false
    }
    peliculas.forEach(pelicula => {
        const { id, vote_average, poster_path: image } = pelicula;
        templateCard.querySelector('img').setAttribute('src', IMG_PATH + image);
        templateCard.querySelector('img').dataset.id = id;
        templateCard.querySelector('p').textContent = vote_average;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment);

}
const pintarPelicula = (peliculas) => {

    peliculas.forEach(pelicula => {
        const { id, vote_average, poster_path: image } = pelicula;
        templateCard.querySelector('img').setAttribute('src', IMG_PATH + image);
        templateCard.querySelector('img').dataset.id = id;
        templateCard.querySelector('p').textContent = vote_average;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment);

}


buscar.addEventListener('submit', (e) => {
    e.preventDefault()
    buscador = true
    limpiar = true
    const searchTerm = search.value
    if (searchTerm !== '') {

        getPeliculasMas(SEARCH_URL + searchTerm)
    } else {
        window.location.reload()
    }
})


masValorada.addEventListener('click', async() => {
    let data = await Valoradas(MAS_URL + MAS_URL2);
    pintarPeliculaMas(data)
    mas = true
    buscador = false
    menos = false
    limpiarMas = false
    document.getElementById('titulo').textContent = "Pelicualas mas valorada"
});
menosValorada.addEventListener('click', async() => {
    let data = await Valoradas(MENOSURL + MAS_URL2);
    pintarPeliculaMas(data)
    menos = true
    mas = false
    buscador = false
    limpiarMenos = false
    document.getElementById('titulo').textContent = "Pelicualas menos valorada"
});

items.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-img-top')) {
        const id = e.target.dataset.id
        localStorage.setItem('idDetalle', id);
        window.location.href = 'detail.html';

    }
})
var imagen = document.querySelector("#request-target");
var visible = false;
let n = 1
window.addEventListener('scroll', () => {
    let posTopView = window.scrollY;
    let posButView = posTopView + window.innerHeight;
    let elemTop = imagen.offsetTop;
    let elemBottom = elemTop + imagen.offsetHeight;
    if ((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView)) {
        if (visible === false && mas === false && menos === false && buscador === false) {
            console.log("Si es visible")
            n += 1
            getPeliculas(`${API_URL}${n}`)

        }
        if (visible === false && mas === true && menos === false && buscador === false) {
            console.log("Si es visible")
            n += 1
            getPeliculasMas(`${MAS_URL}${n} ${MAS_URL2}`)
            limpiarMas = true
            limpiarMenos = true


        }
        if (visible === false && mas === false && menos === true && buscador === false) {
            console.log("Si es visible")
            n += 1
            getPeliculasMas(`${MENOSURL}${n} ${MAS_URL2}`)
            limpiarMas = true
            limpiarMenos = true

        }
        if (visible === false && mas === false && menos === false && buscador === true) {
            return
        }
        visible = true;
    } else {
        if (visible === true) {
            console.log("No es visible")
        }
        visible = false;
    }
})
getPeliculas(API_URL)