const api_key = 'api_key=d333bb863d013220663cd102b8cf611e';
const tmdb_api = 'https://api.themoviedb.org/3';
const popular_movies_url = tmdb_api + '/discover/movie?sort_by=popularity.desc&' + api_key;
const image_url = 'https://image.tmdb.org/t/p/w500';




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
    const main = document.getElementById("main");
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



function showSearchedMovies(){
    const input_search = document.getElementById('inputSearch'); 
    const value = input_search.value;
    window.location = 'searchedMovies?movie_name=' + value;
    return false;

}



function showQuote(quote){
    if(quote){
        var bannerQuote = document.getElementById('banner-quote');
        bannerQuote.innerHTML = `Quote of the day is: ${quote}`;
    }
}
