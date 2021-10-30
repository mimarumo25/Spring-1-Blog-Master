var last_known_scroll_position = 0;
var ticking = false;
let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
let n = 1

function doSomething(scroll_pos) {
    // Hacer algo con la posición del scroll
    if (scroll_pos > 1256) {

        return
    }
}

window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            doSomething(last_known_scroll_position);
            ticking = false;
        });
    }
    ticking = true;
});