function detail(clicked_id){
    const id = clicked_id.split("=")[0];
    const status = clicked_id.split("=")[1];
    const hasil = document.getElementById("hasil-output");
    const title = document.getElementById("title");
    const genre =document.getElementById("genre");
    const over = document.getElementById("overv");
    const date = document.getElementById("date");
    const tag = document.getElementById("tag");
    const rate = document.getElementById("rate");
    const ratem = document.getElementById("ratem");
    const pro = document.getElementById("pro");
    const country = document.getElementById("country");
    const video = document.getElementById("video");
    const close = document.getElementById("close");
    close.innerHTML = "<a href=\"#"+status+"\"><input type=\"button\"class=\"btn btn-link\"><img src=\"../assets/img/close.svg\"  class=\"icons\"></a>";
    const base_url_id = "https://api.themoviedb.org/3/movie/"+id+"?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US";
    const base_url_v = "https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US";
    fetch(base_url_id)
    .then(response => {
        return response.json()
    })
    .then(responseJson => {

        if (responseJson){
            const rating =  responseJson.vote_average*10;
            title.innerHTML = responseJson.title;
            hasil.innerHTML =  `<img src="https://image.tmdb.org/t/p/w500/`+responseJson.poster_path+`" height="100%" width="100%" style="opacity:none;">`;
            for(i=0;i<responseJson.genres.length;i++)
            {
                genre[i] = responseJson.genres[i].name;
            }     
            genre.innerHTML = "<span style=\"color:cyan;\">Genre : </span>"+genre[0]+", "+genre[1];
            over.innerHTML = responseJson.overview;
            date.innerHTML = "<span style=\"color:cyan;\">Release : </span>"+responseJson.release_date;
            tag.innerHTML = responseJson.tagline;
            ratem.innerHTML = rating;
            rate.innerHTML =   `
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="`+rating+`" aria-valuemin="0" aria-valuemax="100" style="width:`+rating+`%">
                `+rating+`%
            </div>
            `;
            pro.innerHTML =  responseJson.production_companies[0].name;
            country.innerHTML =  responseJson.production_countries[0].name;
        }
    })
    fetch(base_url_v)
    .then(response => {
        return response.json()
    })
    .then(responseJson => {
        if (responseJson){
            video.innerHTML =  `<a href="https://www.youtube.com/watch?v=`+responseJson.results[0].key+`" target="_blank" style="color:white; text-decoration:none;"><img src="https://www.searchpng.com/wp-content/uploads/2019/03/Youtube-Splash-Icon-PNG-715x715.png" alt="" width="30px" height="30px"><span class="show2">Watch on Youtube</span>`;
        }
    })
}
