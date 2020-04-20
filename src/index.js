import "regenerator-runtime";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/syam.css";
import main from "./scripts/main";
import "./component/footer.js";
import "./component/header.js";

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
      })
  
main();
