const api_key = 'api_key=d333bb863d013220663cd102b8cf611e';
const tmdb_api = 'https://api.themoviedb.org/3';
const get_movie_api = '/movie/';
const image_url = 'https://image.tmdb.org/t/p/w500';


const main = document.getElementById("main");


function getDislikedMovies(data_dis){

    main.innerHTML = '';
    const movie_el = document.createElement('div');
    movie_el.classList.add('row');
    movie_el.style.margin = "100px";

    for(let i = 0; i < data_dis.length; i++){
        const get_movie_url = tmdb_api + get_movie_api + data_dis[i] + '?' + api_key;
        
        fetch(get_movie_url).then(res => res.json()).then(data =>{
            const {title,poster_path, release_date, overview, id} = data;
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
                    
            })

    
    }
}



function showMovieDetails(id){
    window.location = 'detailsDis?movie_id=' + id;
    return false;
}

function getDisMovieDetails(){
    var url = new URL(window.location.href);
    let movie_id = url.searchParams.get('movie_id'); 
    //console.log(movie_id);
    let movie_details_url = tmdb_api + '/movie/' + movie_id + '?' + api_key;

    const container_button = document.getElementById('container_back_button');
    container_button.innerHTML = '';
    container_button.innerHTML = '<button id="back_button"><a href="/dislikes"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></a></button>';

    let movie_actors_url = tmdb_api + '/movie/' + movie_id + '/credits?' + api_key;
    const actors = document.createElement('li');
    fetch(movie_actors_url).then(res => res.json()).then(movie => {
        const {cast} = movie;

        
        actors.classList.add('list-group-item');
        actors.style.background = 'rgba(0, 0, 0, 0.8)'; 
        actors.style.color = 'white'; 
        actors.innerHTML = '<strong>Actors: </strong>';
        
        for(var i = 0; i < 5; i++){
            if(i == 4 && cast[i].known_for_department == "Acting"){
                actors.innerHTML += `${cast[i].name}. `;
            }
            else if(cast[i].known_for_department == "Acting")
                actors.innerHTML += `${cast[i].name}, `;
        }
    })

    fetch(movie_details_url).then(res => res.json()).then(movie =>{

        const {title,poster_path,release_date, overview, id, production_companies, genres} = movie;
    

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
        lista.appendChild(actors);

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

        const remove = document.createElement('div');
        remove.classList.add('remove-container');

        const removeBtn = document.createElement('button');
        removeBtn.setAttribute("onclick", `removeDislike(${movie_id})`);
        removeBtn.setAttribute('id', 'remove-btn');
        removeBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        removeBtn.style.fontSize = '40px';
        remove.appendChild(removeBtn);
        
        details_right.appendChild(remove);
        details_right.appendChild(lista);

        const jumbotron_text = document.createElement('div');
        jumbotron_text.classList.add('jumbotron');
        jumbotron_text.classList.add('jumbotron-fluid');
        jumbotron_text.style.background = 'rgba(0, 0, 0, 0.8)';


        const rand = document.createElement('div');
        rand.classList.add('row');
        rand.style.padding = '1%';

        const containerImage = document.createElement('div');
        containerImage.classList.add('container-image');

        const imag = document.createElement('img');
        imag.classList.add('image');
        imag.src = `${image_url+poster_path}`;
        imag.alt = `${id}`;
        
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const overlayText = document.createElement('div');
        overlayText.classList.add('text-overlay');
        overlayText.innerHTML = 'Click for teaser';

        containerImage.appendChild(imag);
        overlay.appendChild(overlayText);
        containerImage.appendChild(overlay);

        const col = document.createElement('div');
        col.classList.add('col-5');
        col.style.textAlign = 'center';
        col.appendChild(containerImage);
        rand.appendChild(col);
        rand.appendChild(details_right);

        jumbotron_text.appendChild(rand);
        det_row.appendChild(jumbotron_text);
        det.appendChild(det_row);

        
    })


}

function removeDislike(movie_id){
    fetch('/removeDislike', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
            movie_id: movie_id
        })
    }).then(res => res.json()).then(data => {
        if(data.status === "success"){
            const removeBtn = document.getElementById('remove-btn');
            removeBtn.style.display = 'none';
            const removeContainer = document.getElementsByClassName('remove-container');
            const removedMessage = document.createElement('h5');
            removedMessage.classList.add('alert');
            removedMessage.classList.add('alert-danger');
            removedMessage.innerHTML = 'You deleted this movie from favourites!';
            removeContainer[0].appendChild(removedMessage);
        }
    })
}

document.onclick = function(event){
    const initialTarget = event.target;

    const target = initialTarget.previousElementSibling;


    if(target !== null && target.tagName.toLowerCase() === 'img'){
        const content = document.getElementsByClassName('content');
        content[0].classList.add('content-display');
        const movie_id = target.alt;


        const teaserURL = tmdb_api + '/movie/' + movie_id + '/videos?' + api_key;
   

        fetch(teaserURL).then((res) => res.json()).then((data) => {
            const videos = data.results;
            const length = videos.length >= 4 ? 3 : videos.length;
            const iframeContainer = document.createElement('div');

            content[0].innerHTML = '<i class="fa fa-times" id="content-close" aria-hidden="true"></i>'

            for(let i = 0; i < length; i++){
                const video = videos[i];
                const iframe = createIframe(video);
                iframeContainer.appendChild(iframe);
                content[0].appendChild(iframeContainer);
            }
        })
    }

    if(initialTarget.id === 'content-close'){
        const content = initialTarget.parentElement;
        content.classList.remove('content-display');
    }
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = '30%';
    iframe.height = 270;
    iframe.allowFullscreen = true;
    return iframe;
}


function getComments(){
    var url = new URL(window.location.href);
    const movie_id = url.searchParams.get('movie_id'); 

    fetch('/getComments?movie_id=' + movie_id + '&username=' + user).then(res => res.json()).then(data =>{
        if(data.status === "success"){
            var comments = data.comments;
            

            const commentsDisplayContainer = document.getElementById('comments-text-container');
            const commentDiv = document.getElementById('comments');

            
            for(let i = 0; i <comments.length; i++){
                
                const commentBox = document.createElement('div');
                commentBox.classList.add('text-justify');
                commentBox.classList.add('comm');

                const usernameBox = document.createElement('h5');
                usernameBox.innerHTML = `${comments[i].username}`;

                const dateBox = document.createElement('span');
                const date = comments[i].date;
           
                dateBox.innerHTML = ` - ${date}`;

                const textCommBox = document.createElement('p');
                textCommBox.innerHTML = `${comments[i].comment}`;

                commentBox.appendChild(usernameBox);
                commentBox.appendChild(dateBox);
                commentBox.appendChild(textCommBox);

                commentsDisplayContainer.appendChild(commentBox);
            }
            
         }
     })
}


function addComment(){

    const comment = document.getElementById('comment-text').value;
    var url = new URL(window.location.href);
    const movie_id = url.searchParams.get('movie_id'); 

    document.getElementById('comment-text').value = "";

    const emptyMessage = document.getElementsByClassName('empty');
    emptyMessage[0].style.display = 'none';


    if(comment !== ""){
        fetch('/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                movie_id: movie_id,
                username: user,
                comment: comment
            })
        }).then(res => res.json()).then(data =>{
            if(data.status === "success"){
             
                var comment = data.comment;

                const commentxTextContainer = document.getElementById('comments-text-container');
                const commentDiv = document.getElementById('comments');

                const commentBox = document.createElement('div');
                commentBox.classList.add('text-justify');
                commentBox.classList.add('comm');

                const usernameBox = document.createElement('h5');
                usernameBox.innerHTML = `${comment.username}`;

                const dateBox = document.createElement('span');
                const date = comment.date;
                dateBox.innerHTML = ` - ${date}`;

                const textCommBox = document.createElement('p');
                textCommBox.innerHTML = `${comment.comment_text}`;

                commentBox.appendChild(usernameBox);
                commentBox.appendChild(dateBox);
                commentBox.appendChild(textCommBox);

                commentxTextContainer.insertBefore(commentBox, commentxTextContainer.firstChild);
            
                commentDiv.appendChild(commentxTextContainer);
            }
            getCountComments();
        })
    } else {
        emptyMessage[0].style.display = 'inline';
    }
}

function getCountComments(){

    var url = new URL(window.location.href);
    const movie_id = url.searchParams.get('movie_id'); 

    fetch('/getCountComments?movie_id=' + movie_id).then(res => res.json()).then(data =>{
        if(data.status === 'success'){
            var nrComments = data.number;
            const commentsTitle = document.getElementsByClassName('comments-title');
            commentsTitle[0].innerHTML = `Comments (${nrComments})`;
        }
    })
}



