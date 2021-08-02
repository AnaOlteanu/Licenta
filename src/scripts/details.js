document.onclick = function(event){
    const initialTarget = event.target;
    console.log(initialTarget);

    const target = initialTarget.previousElementSibling;
    console.log(target);

    if(target !== null && target.tagName.toLowerCase() === 'img'){
        const content = document.getElementsByClassName('content');
        content[0].classList.add('content-display');
        const movie_id = target.alt;
        console.log(movie_id);

        const teaserURL = tmdb_api + '/movie/' + movie_id + '/videos?' + api_key;
        console.log(teaserURL);

        fetch(teaserURL).then((res) => res.json()).then((data) => {
            const videos = data.results;
            const length = videos.length > 4 ? 3 : videos.length;
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
    iframe.width = 460;
    iframe.height = 415;
    iframe.allowFullscreen = true;
    return iframe;
}

