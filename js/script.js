import { Valoradas } from "./valoracion.js";


const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const MAS_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&vote_count.gte=1000&language=en-US'
const MENOS_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&vote_count.gte=1000&language=en-US'

const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const buscar = document.getElementById("form")
const search = document.getElementById('search')
const masValorada = document.getElementById('masValoradas');
const menosValorada = document.getElementById('menosValoradas');




const getPeliculas = async(url) => {

    try {
        const peticion = await fetch(url)
        const pelicula = await peticion.json()
        const { results } = pelicula
        pintarPelicula(results)

    } catch (error) {
        console.log(error)
    }
}



const pintarPelicula = (peliculas) => {

    items.innerHTML = ""
    console.log(peliculas);
    peliculas.forEach(pelicula => {
        const { vote_average, poster_path: image } = pelicula;
        templateCard.querySelector('img').setAttribute('src', IMG_PATH + image);
        templateCard.querySelector('p').textContent = vote_average;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment);
}

buscar.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm !== '') {

        getPeliculas(SEARCH_URL + searchTerm)
    } else {
        window.location.reload()
    }
})


masValorada.addEventListener('click', async() => {
    let data = await Valoradas(MAS_URL);
    pintarPelicula(data)
});
menosValorada.addEventListener('click', async() => {
    let data = await Valoradas(MENOS_URL);
    pintarPelicula(data)
});
getPeliculas(API_URL)