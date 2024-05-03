let swiper =new Swiper(".mySwiper",{
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect:{
        rotate: 15,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows : true,
    },
    loop: true,
    autoplay: {
        delay: 2500,  // Los slides cambiarán cada 2500 milisegundos (2.5 segundos)
        disableOnInteraction: false,  // Continúa la reproducción automática incluso después de la interacción del usuario
    },
});


// Obtiene el modal
var modal = document.getElementById("imageModal");

// Obtiene la imagen e inserta dentro del modal, y añade el texto de caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

// Obtiene el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() { 
    modal.style.display = "none";
}

// Opcional: cerrar el modal si se hace clic en cualquier lugar fuera de la imagen
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}




// codigo por si vuelvo a intentar hacerlo dinamico alguna vez porque no funciono

// function initSwiper() {
//     let swiper = new Swiper(".mySwiper", {
//         effect: "coverflow",
//         grabCursor: true,
//         centeredSlides: true,
//         slidesPerView: "auto",
//         coverflowEffect: {
//             rotate: 15,
//             stretch: 0,
//             depth: 300,
//             modifier: 1,
//             slideShadows: true,
//         },
//         loop: true, 
//         autoplay: {
//             delay: 2500,  // Los slides cambiarán cada 2500 milisegundos (2.5 segundos)
//             disableOnInteraction: false,  // Continúa la reproducción automática incluso después de la interacción del usuario
//         },
    
//     });
//     swiper.update(force)
// }

// const urlParams = new URLSearchParams(window.location.search);
//     const grupo = urlParams.get('grupo');
//     const swiperWrapper = document.getElementById('swiper-wrapper');

//     // Limpiar el contenido actual del swiper
//     swiperWrapper.innerHTML = '';

//     // Añadir slides según el grupo
//     switch (grupo) {
//         case 'paint':
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/1.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/2.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/4.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/5.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/6.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/7.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/8.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/1.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/2.jpg" data-lightbox="mygallery " alt="Imagen 1"></div>';
            
//             break;
//         case 'drawing':
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
//             swiperWrapper.innerHTML += '<div class="swiper-slide"><img src="images/3.jpg" data-lightbox="mygallery " alt="Imagen 3"></div>';
            
//             break;
//         default:
//             swiperWrapper.innerHTML += '<div class="swiper-slide">Por favor, selecciona un grupo.</div>';
//             break;
//     }

// // crar archivos de la carga dinamica de la  pagina
//  document.addEventListener('DOMContentLoaded', () => {
    
        
//     initSwiper()
    
//     // Obtiene el modal
//     var modal = document.getElementById("imageModal");

//     // Obtiene la imagen e inserta dentro del modal, y añade el texto de caption
//     var modalImg = document.getElementById("img01");
//     var captionText = document.getElementById("caption");
//     document.querySelectorAll('.swiper-slide img').forEach(img => {
//         img.onclick = function () {
//             modal.style.display = "block";
//             modalImg.src = this.src;
//             captionText.innerHTML = this.alt;
//         }
//     });

//     // Obtiene el elemento <span> que cierra el modal
//     var span = document.getElementsByClassName("close")[0];

//     // Cuando el usuario hace clic en <span> (x), cierra el modal
//     span.onclick = function () {
//         modal.style.display = "none";
//     }

//     // Opcional: cerrar el modal si se hace clic en cualquier lugar fuera de la imagen
//     window.onclick = function (event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     }
// });