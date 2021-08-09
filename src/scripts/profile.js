const api_key = 'api_key=d333bb863d013220663cd102b8cf611e';
const tmdb_api = 'https://api.themoviedb.org/3';
const get_movie_api = '/movie/';
const image_url = 'https://image.tmdb.org/t/p/w500';
const trailer_url = ''


const main = document.getElementById("main");
const main2 = document.getElementById("main-2");

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

function getDislikedMovies(data_dis){
    main2.innerHTML = '';
    const movie_el = document.createElement('div');
    movie_el.classList.add('row');
    movie_el.style.margin = "40px";

    var maxim = 1;

    if(data_dis.length >= 5){
        maxim = 5;
    }
    else if(data_dis.length == 0){
        maxim = 0;
    }
    else if(data_dis.length < 5){
        maxim = data_dis.length;
    }

    if(maxim == 0){
        const no_fav = document.createElement('div');
        no_fav.setAttribute("id", "no-fav");
        no_fav.classList.add('container-no-fav');
        no_fav.innerHTML = 'No dislikes yet! <a href="/home">Dislike some of our movies first!</a>'
        main2.appendChild(no_fav);
    }

    for(let i = 0; i < maxim; i++){
        const get_movie_url = tmdb_api + get_movie_api + data_dis[i] + '?' + api_key;

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
            main2.appendChild(movie_el);
                    
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
                        <a href="/dislikes" id="see-more">See more</a>
                    </div>
                </div>
                
            `
        movie_el.appendChild(see_more);
        main.appendChild(movie_el);
    }
    
    
}

var ctx = document.getElementById('myChart');

const main3 = document.getElementById('main-3');

async function getPreferredGenres(data_fav){

    var genres_movie = [];
    var frecventa = [];
    for(let k = 0; k < data_fav.length; k++){

        const get_movie_url = tmdb_api + get_movie_api + data_fav[k] + '?' + api_key;

        await fetch(get_movie_url).then(res => res.json()).then(data => {
            const {genres} = data;

            for(let i = 0; i < genres.length; i++){
                var gen_crt = genres[i].name;
                console.log(gen_crt);
                if(genres_movie.length == 0){
        
                    genres_movie.push(gen_crt);
                    frecventa.push(1);
                    
                }
               
                else {
                    var lungime = genres_movie.length;
                    if(!genres_movie.includes(gen_crt)){
                        genres_movie.push(gen_crt);
                        frecventa.push(1);
                    } else {
                        var index = genres_movie.indexOf(gen_crt);
                        frecventa[index] ++;
                    }
                }
            }
            
            
        })

    }

    console.log(genres_movie)
    console.log(frecventa);

    var gen_freq = [];
    for(let i = 0; i < genres_movie.length; i++){
        var ob = {
            genre: genres_movie[i],
            freq: frecventa[i]
        }
        gen_freq.push(ob);
    }
    console.log(gen_freq);

    gen_freq.sort((a, b) => (a.freq > b.freq) ? -1 : ((b.freq > a.freq) ? 1 : 0))
    console.log(gen_freq);

    var n = genres_movie.length > 10 ? 10 : genres_movie.length;
    const getFirstN = gen_freq.slice(0, n);
    
    const firstNgenres = [];
    const firstNfreq = [];
    
    for(let i = 0; i < n; i++){
        firstNgenres.push(gen_freq[i].genre);
        firstNfreq.push(gen_freq[i].freq);
    }

    var colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)',
            'rgb(255, 159, 64)', 'rgb(144,238,144)', 'rgb(221,160,221)', 'rgb(220,20,60)', 'rgb(139,0,139)'];
    var bgColor = [];
    for(let i = 0; i < n; i++){
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        while(bgColor.includes(random_color)){
            random_color = colors[Math.floor(Math.random() * colors.length)];
        }
        bgColor.push(random_color);
    }

    console.log(bgColor);


    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: firstNgenres,
            datasets: [{
                label: 'Number of Movies',
                data: firstNfreq,
                backgroundColor: bgColor
            }]
        },
        options: {
            title: {
                display: true,
                text: "Preferred Genres",
                fontSize: 30
              },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'right'
            }
        }
    })

    Chart.defaults.global.defaultFontColor = "white";

}


