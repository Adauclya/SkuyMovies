function main() {
    class IconLogo extends HTMLElement {
    
        connectedCallback() {
        this.src = this.getAttribute("src") || null;
        this.width = this.getAttribute("width") || null;
        this.height = this.getAttribute("height") || null;
        this.render();
        
        }

        render(){
            
            this.innerHTML = `
            <style>
                figure{
                    margin-top: 10px;
                    margin-left: 50px;
                }
            </style>
            <figure>
            <img src="${this.src}"
                width="${this.width}"
                height="${this.height}">
            </figure>
        `;
        }
    }   
    customElements.define("icon-logo", IconLogo);
    
    const bulan = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const base_url_top = "https://api.themoviedb.org/3/movie/top_rated?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US&page=1";
    const base_url_up = "https://api.themoviedb.org/3/movie/upcoming?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US&page=1";
    const base_url_pop = "https://api.themoviedb.org/3/movie/popular?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US&page=1";
    const base_url_now = "https://api.themoviedb.org/3/movie/now_playing?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US&page=1";

    const getTopMovie = async () => {
        try {
          const response = await fetch(`${base_url_top}`);
          const responseJson = await response.json();
          if(responseJson.error) {
             showResponseMessage(responseJson.message);
          } else {
             renderAllTopMovies(responseJson.results);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    const getUpcomingMovie = async () => {
        try {
          const response = await fetch(`${base_url_up}`);
          const responseJson = await response.json();
          if(responseJson.error) {
            ResponsesErorr(responseJson.message);
          } else {
             renderAllUpcomingMovies(responseJson.results);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    const getPopularMovie = async () => {
        try {
          const response = await fetch(`${base_url_pop}`);
          const responseJson = await response.json();
          if(responseJson.error) {
            ResponsesErorr(responseJson.message);
          } else {
             renderAllPopMovies(responseJson.results);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    const getNowMovie = async () => {
        try {
          const response = await fetch(`${base_url_now}`);
          const responseJson = await response.json();
          if(responseJson.error) {
            ResponsesErorr(responseJson.message);
          } else {
             renderAllnowMovies(responseJson.results);
          }
        } catch(error) {
           showResponseMessage(error);
        }
    }

    const renderAllTopMovies = (results) => {
        const listMovies = document.querySelector("#movie1");
        listMovies.innerHTML = "";
        
        results.forEach(movies => {
            const tanggal = new Date(movies.release_date).getDate();
            const xbulan = new Date(movies.release_date).getMonth();
            const xtahun = new Date(movies.release_date).getYear();
            const newbulan = bulan[xbulan];
            const tahun = (xtahun < 1000)?xtahun + 1900 : xtahun;
            const release = `${tanggal} ${newbulan} ${tahun}`;
            const rating =  movies.vote_average*10;
            listMovies.innerHTML += `
                <div class="col-lg-3 col-md-3 col-sm-12" style="margin-top: 10px;">
                <a href="#popup">
                <button class="btn btn-link float-left" style="text-align:left; text-decoration:none;" id="${movies.id}=toprated" onClick="detail(this.id)">
                    <div class="card card-main" style="border :0;">
                        <img class="rounded" src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" width="100%" height="auto">
                        <h5 class="hidden-m show"><b>${movies.title}</b></h5>
                        <span class="show">Rating: <br></span>
                        <span class="progress" style="margin-bottom:10px;">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="${rating}" aria-valuemin="0" aria-valuemax="100" style="width:${rating}%">
                                ${rating}%
                            </div>
                        </span>
                        <h6 class="show">Release : ${release}</h6>
                    </div>
                </button>
                </a>
                </div>
            `;
        });
        
    };
    const ResponsesErorr = (message = "Check your internet connection") => {
        alert(message);
    };
    document.addEventListener("DOMContentLoaded", () => {
        getTopMovie();
    });
    
    

    const renderAllUpcomingMovies = (results) => {
        const listMovies = document.querySelector("#movie2");
        listMovies.innerHTML = "";
        
        results.forEach(movies => {
            const tanggal = new Date(movies.release_date).getDate();
            const xbulan = new Date(movies.release_date).getMonth();
            const xtahun = new Date(movies.release_date).getYear();
            const newbulan = bulan[xbulan];
            const tahun = (xtahun < 1000)?xtahun + 1900 : xtahun;
            const release = `${tanggal} ${newbulan} ${tahun}`;
            const rating =  movies.vote_average*10;
            listMovies.innerHTML += `
                <div class="col-lg-3 col-md-3 col-sm-12" style="margin-top: 10px;">
                <a href="#popup">
                <button class="btn btn-link float-left" style="text-align:left; text-decoration:none;" id="${movies.id}=upcoming" onClick="detail(this.id)">
                    <div class="card card-main" style="border :0;">
                        <img class="rounded" src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" width="100%" height="auto">
                        <h5 class="hidden-m show"><b>${movies.title}</b></h5>
                        <span class="show">Rating: <br></span> 
                        <span class="progress" style="margin-bottom:10px;">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="${rating}" aria-valuemin="0" aria-valuemax="100" style="width:${rating}%">
                                ${rating}%
                            </div>
                        </span>
                        <h6 class="show">Release : ${release}</h6>
                    </div>
                    </button>
                    </a>
                </div>
            `;
        });
    };
    document.addEventListener("DOMContentLoaded", () => {
        getUpcomingMovie();
    });

    
    const renderAllPopMovies = (results) => {
        const listMovies = document.querySelector("#movie3");
        listMovies.innerHTML = "";
        
        results.forEach(movies => {
            const tanggal = new Date(movies.release_date).getDate();
            const xbulan = new Date(movies.release_date).getMonth();
            const xtahun = new Date(movies.release_date).getYear();
            const newbulan = bulan[xbulan];
            const tahun = (xtahun < 1000)?xtahun + 1900 : xtahun;
            const release = `${tanggal} ${newbulan} ${tahun}`;
            const rating =  movies.vote_average*10;
            listMovies.innerHTML += `
                <div class="col-lg-3 col-md-3 col-sm-12" style="margin-top: 10px;">
                <a href="#popup">
                <button class="btn btn-link float-left" style="text-align:left; text-decoration:none;" id="${movies.id}=popular" onClick="detail(this.id)">
                    <div class="card card-main" style="border :0;">
                        <img class="rounded" src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" width="100%" height="auto">
                        <h5 class="hidden-m show"><b>${movies.title}</b></h5>
                        <span class="show">Rating: <br></span> 
                        <span class="progress" style="margin-bottom:10px;">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="${rating}" aria-valuemin="0" aria-valuemax="100" style="width:${rating}%">
                                ${rating}%
                            </div>
                        </span>
                        <h6 class="show">Release : ${release}</h6>
                    </div>
                    </button>
                    </a>
                </div>
            `;
        });
    };
    document.addEventListener("DOMContentLoaded", () => {
        getPopularMovie();
    });


    const renderAllnowMovies = (results) => {
        const listMovies = document.querySelector("#movie4");
        listMovies.innerHTML = "";
        
        results.forEach(movies => {
            const tanggal = new Date(movies.release_date).getDate();
            const xbulan = new Date(movies.release_date).getMonth();
            const xtahun = new Date(movies.release_date).getYear();
            const newbulan = bulan[xbulan];
            const tahun = (xtahun < 1000)?xtahun + 1900 : xtahun;
            const release = `${tanggal} ${newbulan} ${tahun}`;
            const rating =  movies.vote_average*10;
            listMovies.innerHTML += `
                <div class="col-lg-3 col-md-3 col-sm-12" style="margin-top: 10px;">
                <a href="#popup">
                <button class="btn btn-link float-left" style="text-align:left; text-decoration:none;" id="${movies.id}=latest" onClick="detail(this.id)">
                    <div class="card card-main" style="border :0;">
                        <img class="rounded" src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" width="100%" height="auto">
                        <h5 class="hidden-m show"><b>${movies.title}</b></h5>
                        <span class="show">Rating: <br></span> 
                        <span class="progress" style="margin-bottom:10px;">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="${rating}" aria-valuemin="0" aria-valuemax="100" style="width:${rating}%">
                                ${rating}%
                            </div>
                        </span>
                        <h6 class="show">Release : ${release}</h6>
                    </div>
                    </button>
                    </a>
                </div>
            `;
        });
    };
    document.addEventListener("DOMContentLoaded", () => {
        getNowMovie();
    });
    
}

export default main;

