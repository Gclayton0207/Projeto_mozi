const api = "api_key=7054674b47bae17d91d790355e1e3dc4";
const base_url = "https://api.themoviedb.org/3";
const final_url = base_url + "/discover/movie?certification_country=BR&sort_by=popularity.desc&" + api + "&language=pt-BR";
const img_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + "/search/movie?certification_country=BR&certification.lte=L&sort_by=popularity.desc&" + api + "&language=pt-BR";

const form = document.getElementById("pesquisa");
const search = document.getElementById("search");
const main = document.getElementById('main');
const tagsEl = document.getElementById("tags");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const atual = document.getElementById("atual");
const overlayContent = document.getElementById("overlay-content");

var paginaAtual = 1;
var proximaPagina = 2;
var paginaAnterior = 3;
var ultimaUrl = '';
var totalPaginas = 100;


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

function BotaoLimpar() {
    let limparBotao = document.getElementById('limpar');
    if (limparBotao) {
        limparBotao.classList.add('selecionada');
    } else {
        let limpar = document.createElement('div');
        limpar.classList.add('tag', 'selecionada');
        limpar.id = 'limpar';
        limpar.innerHTML = 'Limpar X';
        limpar.addEventListener('click', () => {
            generoSelecionado = [];
            colocarGeneros();
            getMovies(final_url);
        })
        tagsEl.append(limpar);
    }
}
getMovies(final_url);

function getMovies(url) {
    ultimaUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        if (data.results.length !== 0) {
            showMovies(data.results);
            paginaAtual = data.page;
            proximaPagina = paginaAtual + 1;
            paginaAnterior = paginaAtual - 1;
            totalPaginas = data.total_pages;

            atual.innerText = paginaAtual;

            if (paginaAtual <= 1) {
                prev.classList.add('disable');
                next.classList.remove('disable');
            } else if (paginaAtual >= ultimaUrl) {
                prev.classList.remove('disable');
                next.classList.add('disable');
            } else {
                prev.classList.remove('disable');
                next.classList.remove('disable');
            }
            tagsEl.scrollIntoView({
                behavior: 'smooth'
            })

        } else {
            main.innerHTML = `<h1>Nenhum filme encontrado</h1>`
        }
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview,
            id
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
                <h3>Sinopse <button class="trailers" id="${id}"> Trailers</button></h3> 
                ${overview}
            </div>
        </div>
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            openNav(movie)
        })
    })
}

function openNav(movie) {
    let id = movie.id;
    fetch(base_url + '/movie/' + id + '/videos?' + api + '&language=pt-BR').then(res => res.json())
        .then(videoData => {
            console.log(videoData);
            if (videoData) {
                document.getElementById("myNav").style.width = "100%";
                if (videoData.results.length > 0) {
                    var embed = [];
                    var dots =[];
                    videoData.results.forEach((video, idx) => {
                        let{name, key,site} = video;
                        if(site == 'YouTube') {
                        embed.push(`
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    `)
                    dots.push(`
                    <span class="dot">${idx + 1} </span>
                    `)
                }
                    })
                    var content =`<h1>${movie.original_title}</h1>
                    <br>
                    ${embed.join('')}
                    <br>
                    <div class="dots">${dots.join('')}</div>
                    `

                    overlayContent.innerHTML = content;
                    activeSlide=0;
                    showVideos();
                }
                else{
                    overlayContent.innerHTML = `<h1>Nenhum trailer encontrado</h1>`

                }
            }
        })

}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
var activeSlide = 0;
var totalVideos=0;
function showVideos(){
    let embedClasses=document.querySelectorAll('.embed');
    let dots=document.querySelectorAll('.dot');
    totalVideos=embedClasses.length;
    embedClasses.forEach((embedTag,idx) =>{
        if(activeSlide == idx){
            embedTag.classList.add('show')
            embedTag.classList.remove('hide')
        } else{
            embedTag.classList.add('hide')
            embedTag.classList.remove('show')
        }
    })
    dots.forEach((dot, indx) =>{
        if(activeSlide ==indx){
            dot.classList.add('active');
        }else{
            dot.classList.remove('active');
        }
    })
}

const leftArrow= document.getElementById('left-arrow');
const rightArrow= document.getElementById('right-arrow');

leftArrow.addEventListener('click', ()=>{
    if(activeSlide >0){
        activeSlide--;
    }else{
        activeSlide = totalVideos -1;
    }
    showVideos()
})

rightArrow.addEventListener('click', ()=>{
    if(activeSlide < (totalVideos -1)){
        activeSlide++;
    }else{
        activeSlide = 0;
    }
    showVideos()
})


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
prev.addEventListener('click', () => {
    if (paginaAnterior > 0) {
        ChamarPagina(paginaAnterior);
    }
})

next.addEventListener('click', () => {
    if (proximaPagina <= totalPaginas) {
        ChamarPagina(proximaPagina);
    }
})

function ChamarPagina(page) {
    let urlSplit = ultimaUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = ultimaUrl + "&page=" + page
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        getMovies(url);
    }


}