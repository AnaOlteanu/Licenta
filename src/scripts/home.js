const api_key = 'api_key=d333bb863d013220663cd102b8cf611e';
const tmdb_api = 'https://api.themoviedb.org/3';
const popular_movies_url = tmdb_api + '/discover/movie?sort_by=popularity.desc&' + api_key;
const image_url = 'https://image.tmdb.org/t/p/w500';


const main = document.getElementById("main");

getPopularMovies(popular_movies_url);

function getPopularMovies(url){

    fetch(url).then(res => res.json()).then(data =>{
        showMovies(data.results);
        var movie_arr = []
            data.results.forEach(movie =>{
                movie_arr.push(movie.id);
            })
            
    })
}

function showMovies(data){
    main.innerHTML = '';
    const movie_el = document.createElement('div');
    movie_el.classList.add('row');
    movie_el.style.margin = "100px";

    data.forEach(movie => {     
        const {title, poster_path, release_date, overview, id} = movie;
        const movie_details = document.createElement('div');
        movie_details.classList.add('col-lg-3');
        movie_details.classList.add('d-flex');
        movie_details.classList.add('align-items-stretch');
        
        movie_details.innerHTML = 
        ` 
                <div class="card" style="padding:20px; margin: 15px; background: rgba(206, 97, 83, 0.6); color: white;">
                    <img class="card-img-top" src="${image_url+poster_path}" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${release_date}</p>
                        <a onclick="showMovieDetails('${id}')" href='#' class="btn btn-secondary" style="color: white;"> Click for details</a>
                    </div>
                </div>
            
        `
        movie_el.appendChild(movie_details);
        main.appendChild(movie_el);
    });
}



function showMovieDetails(id){
    window.location = 'details?movie_id=' + id;
    return false;
}

function getMovie(){
    var url = new URL(window.location.href);
    let movie_id = url.searchParams.get('movie_id'); 
    //console.log(movie_id);
    let movie_details_url = tmdb_api + '/movie/' + movie_id + '?' + api_key;

    fetch(movie_details_url).then(res => res.json()).then(movie =>{

        const {title,poster_path,release_date, overview, id, production_companies, genres} = movie;
    
        const container_button = document.getElementById('container_back_button');
        container_button.innerHTML = '';
        container_button.innerHTML = '<button id="back_button"><a href="/home"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></a></button>';

        const det = document.getElementById('det');
        det.innerHTML = '';

        const det_row = document.createElement('div');
        det_row.classList.add('jumbotron');
        det_row.style.padding = "7px";
        det_row.style.margin = "100px";
        
    
        const lista = document.createElement('ul');
        lista.style.marginRight = '7%';
        lista.classList.add('list-group');
        
        const date = document.createElement('li');
        date.classList.add('list-group-item');
        date.style.background = 'rgba(0, 0, 0, 0.8)'; 
        date.style.color = 'white'; 
        date.innerHTML = '<strong>Release date: </strong>' + `${release_date}`;
        lista.appendChild(date);
        
        const genres_movie = document.createElement('li');
        genres_movie.classList.add('list-group-item');
        genres_movie.style.background = 'rgba(0, 0, 0, 0.8)'; 
        genres_movie.style.color = 'white'; 
        genres_movie.innerHTML = '<strong>Genres: </strong>';
        for(var i = 0; i < genres.length; i++){
            if(i == genres.length-1){
                genres_movie.innerHTML += `${genres[i].name}. `;
            }
            else
                genres_movie.innerHTML += `${genres[i].name}, `;
        }
        lista.appendChild(genres_movie);

        const production = document.createElement('li');
        production.classList.add('list-group-item');
        production.style.background = 'rgba(0, 0, 0, 0.8)'; 
        production.style.color = 'white'; 
        production.innerHTML = '<strong>Production companies: </strong>';
        
        for(var i = 0; i < production_companies.length; i++){
            if(i == production_companies.length-1){
                production.innerHTML += `${production_companies[i].name}.`;
            }
            else
                production.innerHTML += `${production_companies[i].name}, `;
        }
        lista.appendChild(production);

        const overview_movie = document.createElement('li');
        overview_movie.classList.add('list-group-item');
        overview_movie.style.background = 'rgba(0, 0, 0, 0.8)';
        overview_movie.style.color = 'white'; 
        overview_movie.innerHTML = '<strong>Overview: </strong>' + `${overview}`;
        lista.appendChild(overview_movie);

    
        
        const details_right = document.createElement('div');
        details_right.classList.add('col-7');
        

        const titlu = document.createElement('h1');
        titlu.innerHTML = `<h1 class="display-1">${title}</h1>`;
        titlu.style.marginTop = '7%';
        titlu.style.color = 'white';

        details_right.appendChild(titlu);

        if (isLoggedIn){
            const like_btns = document.createElement('div');
            like_btns.innerHTML = `<button id="like-btn" onclick="likeMovie(${movie_id})" style="background-color: Transparent;background-repeat:no-repeat;border: none;overflow: hidden;outline:none"><i style="color:white;" class="fa fa-thumbs-up like-btn"></i></button>`;
            like_btns.style.fontSize = '40px';
            like_btns.classList.add('like-btns');
            details_right.appendChild(like_btns);
        }
 
        details_right.appendChild(lista);

        const jumbotron_text = document.createElement('div');
        jumbotron_text.classList.add('jumbotron');
        jumbotron_text.classList.add('jumbotron-fluid');
        jumbotron_text.style.background = 'rgba(0, 0, 0, 0.8)';


        const rand = document.createElement('div');
        rand.classList.add('row');
        rand.style.padding = '1%';

        const imag = document.createElement('img');
        imag.src = `${image_url+poster_path}`;
        imag.style.width = '70%';
        

        const col = document.createElement('div');
        col.classList.add('col-5');
        col.style.textAlign = 'center';
        col.appendChild(imag);
    

        rand.appendChild(col);
        rand.appendChild(details_right);

        jumbotron_text.appendChild(rand);
        det_row.appendChild(jumbotron_text);
        det.appendChild(det_row);

        
    })


}

const button_search = document.getElementById('search');
const input_search = document.getElementById('inputSearch');
const banner = document.getElementById('banner');
const container_banner = document.getElementById('id-container-banner');

button_search.onclick = function(event){
    event.preventDefault();
    const value = input_search.value;
    const searchUrl = tmdb_api + '/search/movie?' + api_key + '&query=' + value;
    console.log(value)
    

    fetch(searchUrl).then((res) => res.json())
        .then((data) => {
            showMovies(data.results);
            
            banner.innerHTML = '';
            banner.innerHTML = 'You searched for movie ' + `<strong>'${value}'</strong>`;
            
            var movie_arr = []
            data.results.forEach(movie =>{
                movie_arr.push(movie.id);
            })
            

        })
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

function likeMovie(movie_id){
    fetch('/likeMovie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
            movie_id: movie_id
        })
    }).then(res => res.json()).then(data =>{
        if(data.status === "error"){
            const likeBtn = document.getElementById('like-btn');
            likeBtn.style.display = 'none';
            const likeBtns = document.getElementsByClassName('like-btns');
            const alreadyLikedMessage= document.createElement('h5');
            alreadyLikedMessage.classList.add('alert');
            alreadyLikedMessage.classList.add('alert-danger');
            alreadyLikedMessage.innerHTML = 'You already liked this movie!';
            likeBtns[0].appendChild(alreadyLikedMessage);

        } else if(data.status === "success"){
            const likeBtn = document.getElementById('like-btn');
            likeBtn.style.display = 'none';
            const likeBtns = document.getElementsByClassName('like-btns');
            const alreadyLikedMessage= document.createElement('h5');
            alreadyLikedMessage.classList.add('alert');
            alreadyLikedMessage.classList.add('alert-success');
            alreadyLikedMessage.innerHTML = 'You added the movie to your favourites!';
            likeBtns[0].appendChild(alreadyLikedMessage);
        }
    })
}

