import getToken from './token.js';
const tokenInstagram = getToken();

const div = document.getElementById('instagram');
let rowMidias = document.createElement("div");
rowMidias.setAttribute('class', 'row');
const urlAPI = 'https://graph.instagram.com/me/media?access_token='+tokenInstagram+'&fields=media_url,media_type,caption,permalink,like_count';

fetch(urlAPI)
    .then((response) => response.json())
    .then((dados) => {
        let qtdPostagens = 8;
        for (const midia of dados.data) {
            if(qtdPostagens > 0) {
                let a = document.createElement("a");
                let caption = midia.caption !== null ? midia.caption : '';
                let divMidia = document.createElement("div");
                divMidia.setAttribute('class', 'col col-3 postagem');
                if(midia.media_type == "VIDEO") {
                    let video = document.createElement("video");
                    video.src = midia.media_url;
                    video.muted = true;
                    video.loop = true;
                    video.autoplay = true;
                    a.target = "_target";
                    a.href = midia.permalink;
                    a.appendChild(video);
                    divMidia.appendChild(a);

                    rowMidias.appendChild(divMidia);
                    div.appendChild(rowMidias);
                }

                if(midia.media_type == "IMAGE" || midia.media_type == "CAROUSEL_ALBUM") {
                    let figure = document.createElement("figure");
                    let img = document.createElement("img");
                    a.target = "_target";
                    a.href = midia.permalink;

                    img.title = caption;
                    img.alt = caption;
                    img.src = midia.media_url;
                    img.setAttribute('class', 'img-fluid');

                    figure.appendChild(img);
                    a.appendChild(figure);
                    divMidia.appendChild(a);

                    rowMidias.appendChild(divMidia);
                    div.appendChild(rowMidias);
                }

                qtdPostagens--;
            } else break;
        }
})
    .catch(function(error) {
    console.log(error);
});
