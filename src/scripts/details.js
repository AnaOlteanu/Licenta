
function getMovie(){
    var url = new URL(window.location.href);
    let movie_id = url.searchParams.get('movie_id'); 
    
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

        const like_btns = document.createElement('div');
        like_btns.classList.add('like-btns');

        const nr_likes = document.createElement('div');
        nr_likes.classList.add('nr-likes');

        const titlu = document.createElement('h1');
        titlu.innerHTML = `<h1 class="display-1">${title}</h1>`;
        titlu.style.marginTop = '7%';
        titlu.style.color = 'white';

        details_right.appendChild(titlu);
        details_right.appendChild(nr_likes);
        details_right.appendChild(like_btns);
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


        fetch('/getCountLikes?movie_id=' + movie_id).then(res => res.json()).then(data => {
            if(data.status == "success"){
                var nr_likes = data.number;
                fetch('/getCountDislikes?movie_id=' + movie_id).then(res => res.json()).then(data => {
                    if(data.status == "success"){
                        var nr_dislikes = data.number;
                        const nrLikesContainer = document.getElementsByClassName('nr-likes');
                        const nrLikes = document.createElement('div');
                        nrLikes.setAttribute('id', 'nr_likes_dislikes');
                        nrLikes.innerHTML = `${nr_likes} likes ${nr_dislikes} dislikes`;
                        nrLikesContainer[0].appendChild(nrLikes);
                    }
                })
            }
        })
        

        fetch('/getLikeButton?movie_id=' + movie_id).then(res => res.json()).then(data => {
    
            if(data.status == "success"){
                fetch('/getDislikeButton?movie_id=' + movie_id).then(res => res.json()).then(data => {

                    if(data.status == "success"){
                        const likeBtn = document.createElement("button");
                        likeBtn.setAttribute("id", "like-btn");
                        likeBtn.setAttribute("onclick", `likeMovie(${movie_id})`);
                        likeBtn.innerHTML =
                            `
                                <i style="color:white;" class="fa fa-thumbs-up like-btn"></i>
                            `;
                        likeBtn.style.fontSize = '40px';
                        like_btns.appendChild(likeBtn);

                        const dislikeBtn = document.createElement('button');
                        dislikeBtn.setAttribute("id", "dislike-btn");
                        dislikeBtn.setAttribute("onclick", `dislikeMovie(${movie_id})`);
                        dislikeBtn.innerHTML =
                            `
                                <i style="color:white;" class="fa fa-thumbs-down dislike-btn"></i></button>
                            `;
                        dislikeBtn.style.fontSize = '40px';
                        like_btns.appendChild(dislikeBtn);
                        
                    } else {
                        const likeBtns = document.getElementsByClassName('like-btns');
                        const alreadyLikedMessage= document.createElement('h5');
                        alreadyLikedMessage.classList.add('alert');
                        alreadyLikedMessage.classList.add('alert-danger');
                        alreadyLikedMessage.innerHTML = 'You already disliked this movie!';
                        likeBtns[0].appendChild(alreadyLikedMessage);
                    }
                })
                
            } else {
                const likeBtns = document.getElementsByClassName('like-btns');
              
                const alreadyLikedMessage= document.createElement('h5');
                alreadyLikedMessage.classList.add('alert');
                alreadyLikedMessage.classList.add('alert-success');
                alreadyLikedMessage.innerHTML = 'You already liked this movie!';
                likeBtns[0].appendChild(alreadyLikedMessage);
            }
        })
       

        
    })


}


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
       if(data.status === "success"){
            const likeBtn = document.getElementById('like-btn');
            const dislikeBtn = document.getElementById('dislike-btn');
            dislikeBtn.style.display = 'none';
            likeBtn.style.display = 'none';
            const likeBtns = document.getElementsByClassName('like-btns');
            const alreadyLikedMessage= document.createElement('h5');
            alreadyLikedMessage.classList.add('alert');
            alreadyLikedMessage.classList.add('alert-success');
            alreadyLikedMessage.innerHTML = 'You added the movie to your favourites!';
            likeBtns[0].appendChild(alreadyLikedMessage);

            fetch('/getCountLikes?movie_id=' + movie_id).then(res => res.json()).then(data => {
                if(data.status == "success"){
                    var nr_likes = data.number;
                    fetch('/getCountDislikes?movie_id=' + movie_id).then(res => res.json()).then(data => {
                        if(data.status == "success"){
                            var nr_dislikes = data.number;
                            const nrLikesContainer = document.getElementsByClassName('nr-likes');
                            const nrLikes = document.getElementById('nr_likes_dislikes');
                            nr_likes.innerHTML = '';
                            nrLikes.innerHTML = `${nr_likes} likes ${nr_dislikes} dislikes`;
                            nrLikesContainer[0].appendChild(nrLikes);
                        }
                    })
                }
                })
        }
    })
}

function dislikeMovie(movie_id){
    fetch('/dislikeMovie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
            movie_id: movie_id
        })
    }).then(res => res.json()).then(data =>{
       if(data.status === "success"){
            const dislikeBtn = document.getElementById('dislike-btn');
            dislikeBtn.style.display = 'none';
            const likeBtn = document.getElementById('like-btn');
            likeBtn.style.display = 'none';
            const likeBtns = document.getElementsByClassName('like-btns');
            const alreadyDislikedMessage= document.createElement('h5');
            alreadyDislikedMessage.classList.add('alert');
            alreadyDislikedMessage.classList.add('alert-danger');
            alreadyDislikedMessage.innerHTML = 'You disliked this movie!';
            likeBtns[0].appendChild(alreadyDislikedMessage);

            fetch('/getCountLikes?movie_id=' + movie_id).then(res => res.json()).then(data => {
                if(data.status == "success"){
                    var nr_likes = data.number;
                    fetch('/getCountDislikes?movie_id=' + movie_id).then(res => res.json()).then(data => {
                        if(data.status == "success"){
                            var nr_dislikes = data.number;
                            const nrLikesContainer = document.getElementsByClassName('nr-likes');
                            const nrLikes = document.getElementById('nr_likes_dislikes');
                            nr_likes.innerHTML = '';
                            nrLikes.innerHTML = `${nr_likes} likes ${nr_dislikes} dislikes`;
                            nrLikesContainer[0].appendChild(nrLikes);
                        }
                    })
                }
                })
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
        console.log(movie_id);

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
    iframe.width = 350;
    iframe.height = 220;
    iframe.allowFullscreen = true;
    return iframe;
}

function getComments(){
    var url = new URL(window.location.href);
    const movie_id = url.searchParams.get('movie_id'); 

    fetch('/getComments?movie_id=' + movie_id + '&username=' + user).then(res => res.json()).then(data =>{
        if(data.status === "success"){
            var comments = data.comments;
            console.log(comments)
            const commentsDisplayContainer = document.createElement('div');
            commentsDisplayContainer.setAttribute('id','comments-text-container');
            const commentDiv = document.getElementById('comments');

            
            for(let i = 0; i <comments.length; i++){
                
                const commentBox = document.createElement('div');
                commentBox.classList.add('text-justify');
                commentBox.classList.add('comm');

                const usernameBox = document.createElement('h5');
                usernameBox.innerHTML = `${comments[i].username}`;

                const dateBox = document.createElement('span');
                const date = comments[i].date;
                console.log(date);
                dateBox.innerHTML = ` - ${date}`;

                const textCommBox = document.createElement('p');
                textCommBox.innerHTML = `${comments[i].comment}`;

                commentBox.appendChild(usernameBox);
                commentBox.appendChild(dateBox);
                commentBox.appendChild(textCommBox);

                commentsDisplayContainer.appendChild(commentBox);
            }
            commentDiv.appendChild(commentsDisplayContainer);
         }
     })
}

var empty = false;
function addComment(){

    const comment = document.getElementById('comment-text').value;
    var url = new URL(window.location.href);
    const movie_id = url.searchParams.get('movie_id'); 

    console.log(movie_id);
    console.log(user);
    document.getElementById('comment-text').value = "";


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
                console.log(empty);
                if(empty){
                    const message = document.getElementsByClassName('alert');
                    message[0].style.display = 'none';
                }

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

                commentxTextContainer.appendChild(commentBox);
            
                commentDiv.appendChild(commentxTextContainer);
            }
        })
    } else {
        const commentBox = document.getElementById('comment-box');
        const message = document.createElement('div');
        message.classList.add("alert");
        message.classList.add("alert-danger");
        message.innerHTML = 'The comment should not be empty!';
        message.style.marginTop = '1%';
        commentBox.appendChild(message);

        empty = true;
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

