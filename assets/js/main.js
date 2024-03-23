jQuery(window).on('load', function() {
	"use strict";
    
    
    // HIDE PRELOADER
    $(".preloader").addClass("hide-preloader");   
    
    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){

        $("#intro .animation-container").each(function() {

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 800 );

    
});


jQuery(document).ready(function($) {
	"use strict";
    
    
    // ONE PAGE NAVIGATION
	$(".navigation-main .navigation-items").onePageNav({
		currentClass: "current",
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: ":not(.external)",
		easing: "swing"
	});
    
    
    // SMOOTH SCROLL FOR SAME PAGE LINKS
    $(document).on('click', 'a.smooth-scroll', function(event) {
        
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        
    });
    
    
    // INIT PARALLAX PLUGIN
    $(".background-content.parallax-on").parallax({
        scalarX: 24,
        scalarY: 15,
        frictionX: 0.1,
        frictionY: 0.1,
    });
    
    
    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated-from-bottom", { 
        duration: 600,
        delay: 0,
        origin: "bottom",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
    });
    
    
    // WORK CAROUSEL
    $('.work-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 30,
        autoplay: true,
        responsive:{
            800:{
                items: 3,
            },
        }
    });
    
        
});

  // ######################   change text of button send email   ###################### 

  // Esperar a que el DOM se cargue completamente
  document.addEventListener('DOMContentLoaded', function() {
    // Obtener el contenedor del texto
    var emailSpan = document.querySelector('.email-text span');
  
    // Guardar el texto original
    var originalText = emailSpan.textContent;
  
    // Función para cambiar el texto al pasar el mouse
    function mouseOver() {
      emailSpan.textContent = 'Enviar Email';
    }
  
    // Función para revertir el texto cuando el mouse sale
    function mouseOut() {
      emailSpan.textContent = originalText;
    }
  
    // Agregar event listeners al contenedor del texto
    emailSpan.parentNode.addEventListener('mouseover', mouseOver);
    emailSpan.parentNode.addEventListener('mouseout', mouseOut);
  });
  
  