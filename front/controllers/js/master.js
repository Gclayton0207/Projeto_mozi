const api = "api_key=7054674b47bae17d91d790355e1e3dc4";
const base_url = "https://api.themoviedb.org/3";
const final_url = base_url + "/discover/movie?certification_country=BR&sort_by=popularity.desc&" + api + "&language=pt-BR";
const img_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + "/search/movie?certification_country=BR&certification.lte=L&sort_by=popularity.desc&" + api + "&language=pt-BR";

const form = document.getElementById("pesquisa");
const search = document.getElementById("search");
const main = document.getElementById('main');
const tagsEl = document.getElementById("tags");

const generos = [{
        "id": 28,
        "name": "Ação"
    },
    {
        "id": 12,
        "name": "Aventura"
    },
    {
        "id": 16,
        "name": "Animação"
    },
    {
        "id": 35,
        "name": "Comédia"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentário"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Família"
    },
    {
        "id": 14,
        "name": "Fantasia"
    },
    {
        "id": 36,
        "name": "História"
    },
    {
        "id": 27,
        "name": "Terror"
    },
    {
        "id": 10402,
        "name": "Música"
    },
    {
        "id": 9648,
        "name": "Mistério"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Ficção científica"
    },
    {
        "id": 10770,
        "name": "Cinema TV"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "Guerra"
    },
    {
        "id": 37,
        "name": "Faroeste"
    }
];
var generoSelecionado = [];

colocarGeneros();

function colocarGeneros() {
    tagsEl.innerHTML = '';
    generos.forEach(genero => {
        const t = document.createElement("div");
        t.classList.add('tag');
        t.id = genero.id;
        t.innerText = genero.name;
        t.addEventListener('click', () => {
            if (generoSelecionado.length == 0) {
                generoSelecionado.push(genero.id);

            } else {
                if (generoSelecionado.includes(genero.id)) {
                    generoSelecionado.forEach((id, idx) => {
                        if (id == genero.id) {
                            generoSelecionado.splice(idx, 1);
                        }
                    })
                } else {
                    generoSelecionado.push(genero.id);
                }
            }
            getMovies(final_url + '&with_genres=' + encodeURI(generoSelecionado.join(',')))
            tagsSelecionadas()
        })
        tagsEl.append(t);
    })
}

function tagsSelecionadas() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('selecionada');
    })
    BotaoLimpar()
    if (generoSelecionado.length != 0) {
        generoSelecionado.forEach(id => {
            const tagSelecionada = document.getElementById(id);
            tagSelecionada.classList.add('selecionada');
        })
    }

}

function BotaoLimpar(){
    let limparBotao=document.getElementById('limpar');
    if(limparBotao){
        limparBotao.classList.add('selecionada');
    }
    else{ let limpar = document.createElement('div');
    limpar.classList.add('tag','selecionada');
    limpar.id = 'limpar';
    limpar.innerHTML = 'Limpar X';
    limpar.addEventListener('click', ()=>{
        generoSelecionado = [];
        colocarGeneros();
        getMovies(final_url);   
    })
    tagsEl.append(limpar);
}
}
getMovies(final_url);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }
        else{
            main.innerHTML = `<h1>Nenhum filme encontrado</h1>`
    }})
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${poster_path? img_url+poster_path : "https://via.placeholder.com/300"}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${corDaNota(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Sinopse</h3>
                ${overview}
            </div>
        </div>
        `
        main.appendChild(movieEl);
    })
}

function corDaNota(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(search_url + '&query=' + searchTerm)
    } else {
        getMovies(final_url)
    }

})