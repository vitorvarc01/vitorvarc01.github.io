import { API_URL, baseImageUrl, input_URL } from "./urls.js";



let c = 5
let a = 0
let b = 5


function checkScreenSize() {
    if (window.innerWidth <= 1000) {


        const input = document.querySelector('.input')
        input.style.width = '300px';
        const highlight = document.querySelector('.highlight ')
        highlight.style.flexDirection = 'column';
        const highlight__video = document.querySelector('.highlight__video ')
        highlight__video.style.width = '300px'
        const highlight__info = document.querySelector('.highlight__info ')
        highlight__info.style.width = '300px'
        const highlight__description = document.querySelector('.highlight__description')
        highlight__description.style.width = '270px'
        highlight__description.style.maxHeight = '160px';
        const highlight__title = document.querySelector('.highlight__title')
        highlight__title.style.height = '50px';
        highlight__title.style.fontSize = '18px';
        const highlight__rating = document.querySelector('.highlight__rating')
        highlight__rating.style.fontSize = '20px';
        highlight__rating.style.margiTop = '0px'

        c = 1
        a = 0
        b = 1

        const modalimg = document.querySelector('.modal__img');
        modalimg.style.maxWidth = '500px';
        const modaldescription = document.querySelector('.modal__description');
        modaldescription.style.maxWidth = '500px';
        modaldescription.style.textAlign = 'center';
        const modalgenreAverage = document.querySelector('.modal__genre-average');
        modalgenreAverage.style.maxWidth = '500px'

        window.onresize = function () {
            location.reload();
        };
    }

}

window.onload = checkScreenSize;
window.onresize = checkScreenSize;

''

export async function getMovie(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results
        showMovies(results)
    } catch (error) {
        console.error('Erro ao obter os dados do filme:', error);
    }
}

getMovie(API_URL)


export async function showMovies(results, dados, dadosB) {
    const movies_container = document.querySelector('.carrossel');
    movies_container.innerHTML = '';


    results.slice(dados, dadosB || c).forEach(filme => {
        const { title, poster_path, vote_average } = filme;
        if (poster_path) {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                    <div class="movie">
                        <img class="movie_img" src="${baseImageUrl + poster_path}" alt="poster_path">
                        <div class="movie__info">
                            <h3 class="movie__title">${title}</h3>
                            <h3 class="vote_average"><img src="./assets/estrela.svg" alt="star"> ${vote_average.toFixed(1)}</h3>
                        </div>
                    </div>
                `;
            movies_container.appendChild(movieEl);
            setTimeout(() => {
                movieEl.classList.add('show');
            }, 100);

            movieEl.addEventListener('click', () => {
                createmodals(filme);
            });
        }

    });
}

export function createmodals(movie) {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hidden');
    const modal__title = document.querySelector('.modal__title');
    const modal__img = document.querySelector('.modal__img');
    const modal__description = document.querySelector('.modal__description');
    const modal__genres = document.querySelector('.modal__genres');
    const modal__average = document.querySelector('.modal__average');
    modal__title.textContent = movie.title;
    modal__img.setAttribute('src', baseImageUrl + movie.backdrop_path);
    modal__description.textContent = movie.overview;

    modal__genres.innerHTML = '';

    genderModal(movie.id).then(spanGenus => {
        modal__genres.appendChild(spanGenus);
    });

    modal__average.textContent = movie.vote_average.toFixed(1);
}

// Modal Fechar
const modal__close = document.querySelector('.modal__close');
modal__close.addEventListener('click', close_modal)

function close_modal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hidden');

}



export async function highlightDoDia(url) {
    try {
        const res = await fetch(url);
        const resultado = await res.json();
        let dia = 0;
        const updateInfo = async () => {
            dia++;
            if (dia > 20) {
                dia = 0;
            }

            const filmedodia = resultado.results[dia - 1];
            const generos = await genderInput(filmedodia.id);

            const titulo = document.querySelector('.highlight__title');
            titulo.textContent = filmedodia.title;

            const rating = document.querySelector('.highlight__rating');
            rating.textContent = filmedodia.vote_average.toFixed(1);

            const genreLaunch = document.querySelector('.highlight__genres');
            genreLaunch.textContent = generos

            const launch = document.querySelector('.highlight__launch');
            launch.textContent = filmedodia.release_date;

            const description = document.querySelector('.highlight__description');
            description.textContent = filmedodia.overview;

            const video = document.querySelector('.highlight__video');
            const imageUrl = `${baseImageUrl}${filmedodia.backdrop_path}`;
            video.style.backgroundImage = `url('${imageUrl}')`;
            video.style.backgroundSize = 'cover';
            video.style.backgroundPosition = 'center';
            video.style.backgroundRepeat = 'no-repeat';
        };
        updateInfo();
        setInterval(updateInfo, 6400);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }

}
highlightDoDia(API_URL);



export async function genderInput(id) {
    const CUBOS_URL = `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`;
    const response = await fetch(CUBOS_URL);
    const data = await response.json();
    const movie_genre = data.genres.map(genre => genre.name);

    return movie_genre.join(',  ')
}

// Genero do filme para MODAL
async function genderModal(id) {
    const CUBOS_URL = `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`;
    const response = await fetch(CUBOS_URL);
    const data = await response.json();
    const movie_genre = data.genres.map(genre => genre.name);
    const divgenrus = document.createElement('div');
    divgenrus.classList.add('modal__genres');
    movie_genre.forEach(namegenus => {
        const h4genre = document.createElement('h4');
        h4genre.textContent = namegenus;
        h4genre.classList.add('span1');
        divgenrus.appendChild(h4genre);
        h4genre.addEventListener('click', () => {
            buscar(null, namegenus);
        });
    });
    return divgenrus;
}




// Carrossel Direita
const right = document.querySelector('.btn-next')
right.addEventListener('click', async () => {
    carrossel.classList.toggle('movie_input');
    const response = await fetch(API_URL);
    const data = await response.json();
    const results = data.results;


    if (a === 20 || b === 20) {
        if (window.innerWidth <= 1000) {
            a = -1; b = 0;
        }
        else { a = -1; b = 4 }
    }

    a++;
    b++;
    console.log('valor de a', a, 'valor de b', b, 'valor de c', c)
    showMovies(results, a, b);
});

// Carrossel Esquerda
const esquerda = document.querySelector('.btn-prev')
esquerda.addEventListener('click', async () => {
    carrossel.classList.toggle('movie_input');

    const response = await fetch(API_URL);
    const data = await response.json();
    const resultados = data.results;
    if (a === 0 || b === 0) {

        if (window.innerWidth <= 1000) {
            a = 20; b = 21
            console.log('aqui', a, b)
        }

        else {
            a = 16;
            b = 21
            console.log('fora')
        }

        console.log('fora', a, b)
    }
    console.log('fora2', a, b)
    a--;
    b--;

    showMovies(resultados, a, b);
});

//Busca no input
const formulario = document.querySelector('#form');
const input = document.querySelector('.input');
const carrossel = document.querySelector('.carrossel');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    buscar(e);
});


export async function buscar(e, temaProcurado) {
    c = 20;
    a = 0;

    const temaProcuradoInput = input.value;
    if (!temaProcurado) {
        await getMovie(input_URL + '&query=' + temaProcuradoInput);
        carrossel.style.flexWrap = "wrap";
        carrossel.style.gap = "60px";
        //carrossel.style.top = "10px"



    } else if (!temaProcuradoInput) {
        await getMovie(input_URL + '&query=' + temaProcurado);
        carrossel.style.flexWrap = "wrap";
        carrossel.style.gap = "60px";
        //carrossel.style.top = "10px"


    } else {
        await getMovie(API_URL);
        console.log('dentro do else ')
    }
    input.value = "";

}
const subtitle = document.querySelector('.subtitle')
const body = document.querySelector('body');
const darkButton = document.querySelector('.btn-theme');
darkButton.addEventListener('click', () => {

    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        darkButton.src = './assets/dark-mode.svg';
        subtitle.style.color = ' #fdfdfd'
    } else {
        darkButton.src = './assets/light-mode.svg';
        subtitle.style.color = '#000'
    }
});



