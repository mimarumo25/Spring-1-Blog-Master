const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const buscar = document.getElementById("form")
const search = document.getElementById('search')


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
    peliculas.forEach(pelicula => {
        const { title, poster_path: image } = pelicula;
        templateCard.querySelector('img').setAttribute('src', IMG_PATH + image);
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

getPeliculas(API_URL)