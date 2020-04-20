function search(ele) {
    if(event.key === 'Enter') {
        const result = document.querySelector("#hasil");
        result.innerHTML = "";
        const isi = ele.value;
        const base_url_search = "https://api.themoviedb.org/3/search/movie?api_key=25a28060d95ca53c91158026ecf584a9&language=en-US&query="+isi+"&page=1&include_adult=false";
        fetch(base_url_search)
        .then(response => {
            return response.json()
        })

        .then(responseJson => {
            if (responseJson){
                const available = responseJson.total_results
                const result = responseJson.results;
                if(available != 0){
                    result.forEach(movies => {
                        var txt = movies.overview.substring(0, 173)+ ' ...';
                        hasil.innerHTML +=`
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <a href="#popup">
                                        <button class="btn btn-link float-left" style="text-align:left; text-decoration:none;" id="${movies.id}=toprated" onClick="detail(this.id)">
                                            <div class="card card-s-2">
                                                <div class="row">
                                                    <div class="col-lg-3">
                                                        <img src="https://image.tmdb.org/t/p/w200${movies.poster_path}" alt="${movies.title}">
                                                    </div>
                                                    <div class="col-lg-7">
                                                    <div class="judul">
                                                        ${movies.title}
                                                    </div>
                                                    <div class="desc" style="text-align:justify;">
                                                        ${txt}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        `;
                    });
                }else{
                    alert(`Kata kunci ${isi} tidak ditemukan`);
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
}

$(document).ready(()=> {
    "use strict";
    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\" style=\"color:black;\"><i class=\"fa fa-bars\"></i></a>");
    $(".menu > ul > li").hover(function(e) {
        if ($(window).width() > 943) {
            $(this).children("ul").stop(true, false).fadeToggle(150);
            e.preventDefault();
        }
    });

    $(".menu-mobile").click(function(e) {
        $(".menu > ul").toggleClass('show-on-mobile');
        e.preventDefault();
    });
});

$(".menu > ul > li").click(function() {
    if ($(window).width() <= 943) {
        $(this).children("ul").fadeToggle(150);
    }
});

$(window).resize(function() {
    $(".menu > ul > li").children("ul").hide();
    $(".menu > ul").removeClass('show-on-mobile');
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});