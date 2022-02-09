
const api = "api_key=7054674b47bae17d91d790355e1e3dc4";
const base_url = "https://api.themoviedb.org/3";
const final_url = base_url + "/discover/movie?certification_country=BR&certification.lte=L&sort_by=popularity.desc&with_genres=16&"+api+"&language=pt-BR";
const img_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + "/search/movie?certification_country=BR&certification.lte=L&sort_by=popularity.desc&"+api+"&language=pt-BR";
const form = document.getElementById("pesquisa");
const search = document.getElementById("search");
const main = document.getElementById('main');

getMovies(final_url);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data=>{
        showMovies(data.results);
    })
}
function showMovies(data){
    main.innerHTML = '';
data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieEl=document.createElement("div");
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <img src="${img_url+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
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

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }
    else if (vote >= 5){
        return 'orange'
    }
    else{
        return 'red'
}
}
form.addEventListener('submit', (e) =>{
     e.preventDefault();
     const searchTerm = search.value;
     if(searchTerm){
         getMovies(search_url+'&query='+searchTerm)
     }
     else{
        getMovies(final_url)
     }

})