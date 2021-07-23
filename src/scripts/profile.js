const api_key = 'api_key=d333bb863d013220663cd102b8cf611e';
const tmdb_api = 'https://api.themoviedb.org/3';
const get_movie_api = '/movie/';
const image_url = 'https://image.tmdb.org/t/p/w500';
const trailer_url = ''


const main = document.getElementById("main");

function getFavouriteMovies(data_fav){
    main.innerHTML = '';
    const movie_el = document.createElement('div');
    movie_el.classList.add('row');
    movie_el.style.margin = "40px";

    var maxim = 1;

    if(data_fav.length >= 5){
        maxim = 5;
    }
    else if(data_fav.length == 0){
        maxim = 0;
    }
    else if(data_fav.length < 5){
        maxim = data_fav.length;
    }

    if(maxim == 0){
        const no_fav = document.createElement('div');
        no_fav.setAttribute("id", "no-fav");
        no_fav.classList.add('container-no-fav');
        no_fav.innerHTML = 'No favourites yet! <a href="/home">Like some of our movies first!</a>'
        main.appendChild(no_fav);
    }

    for(let i = 0; i < maxim; i++){
        const get_movie_url = tmdb_api + get_movie_api + data_fav[i] + '?' + api_key;

        fetch(get_movie_url).then(res => res.json()).then(data =>{

            const {title,poster_path, release_date, overview, id} = data;

            const movie_details = document.createElement('div');
            movie_details.classList.add('col-10');
            movie_details.classList.add('col-md-2');
            movie_details.classList.add('col-lg-2');
            movie_details.classList.add('d-flex');
            movie_details.classList.add('align-items-stretch');
          
            
            movie_details.innerHTML = 
            ` 
                <div class="card" style="padding:7px; width: 200px; margin: 1px; color: white;">
                    <img class="card-img-top"  src="${image_url+poster_path}" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${release_date}</p>
                    </div>
                </div>
                
            `
            movie_el.appendChild(movie_details);
            main.appendChild(movie_el);
                    
        })

    }

    if(maxim != 0){
        const see_more = document.createElement('div');
        see_more.classList.add('col-10');
        see_more.classList.add('col-md-2');
        see_more.classList.add('col-lg-2');
        see_more.classList.add('d-flex');
        see_more.classList.add('align-items-stretch');
            
        see_more.innerHTML = 
            ` 
                <div class="card text-center" style="padding: 7px; width: 200px; margin: 1px; color: white;">
                    <div class="card-body align-items-center d-flex justify-content-center">
                        <a href="/favourites" id="see-more">See more</a>
                    </div>
                </div>
                
            `
        movie_el.appendChild(see_more);
        main.appendChild(movie_el);
    }
    
    
}

