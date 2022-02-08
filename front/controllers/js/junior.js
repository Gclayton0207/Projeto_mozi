
$('.btn').click(function (event) {
    
    event.preventDefault();
    filme();

});


function filme() {

    const filme = $('#filme').val();
    const urlOmdb = `http://www.omdbapi.com/?apikey=f7ae3b6d&s=${filme}&page=1`;
    let div = document.querySelector('#cartaz');
    $('#cartaz').empty();

    $.ajax({
        url: urlOmdb,

        success: function (pesquisa) {
           
               
                console.log(pesquisa);
                if (pesquisa.Response != 'False') {
                    for (let i = 0; i < pesquisa.Search.length; i++) {
                   
                        if (pesquisa.Search[i].Poster != "N/A" && pesquisa.Search[i].Type != "game" && pesquisa.Search[i].Year < '2000') {
                            let img = document.createElement('img');
                            let titulo = document.createElement('h1');
                            let li = document.createElement('li');
                            let ano = document.createElement('p');
                            img.classList.add('cards-img');
                            titulo.classList.add('cards-texto');
                            ano.classList.add('cards-texto');
                            li.classList.add('cards');

                            img.setAttribute('src', pesquisa.Search[i].Poster);
                            titulo.innerText = pesquisa.Search[i].Title;
                            ano.innerText = pesquisa.Search[i].Year;

                            li.appendChild(titulo);
                            li.appendChild(ano);
                            li.appendChild(img);
                            div.appendChild(li);

                           
                            
                            //     div.innerHTML = `
                            // <li class="poster">
                            // <h1>${pesquisa.Search[i].Title}</h1>
                            // <p>${pesquisa.Search[i].Year}</p>
                            // <img src ="${pesquisa.Search[i].Poster}">
                            // </li>
                            // `
                           console.log(div)
                        };
                    };
                };
           
        },
    });
};
