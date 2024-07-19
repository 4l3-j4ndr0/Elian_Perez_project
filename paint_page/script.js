debugger
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
let modal = document.getElementById("imageModal"); // Selecciona el elemento modal por su ID

// Obtiene la imagen e inserta dentro del modal, y añade el texto de caption
let modalImg = document.getElementById("img01"); // Selecciona el elemento de la imagen dentro del modal por su ID
let captionText = document.getElementById("caption"); // Selecciona el elemento de texto dentro del modal por su ID
let closeBtn = document.getElementsByClassName("close")[0]; // Selecciona el primer elemento con la clase "close" (botón de cerrar)
let prevBtn = document.getElementsByClassName("prev")[0]; // Selecciona el primer elemento con la clase "prev" (botón de imagen anterior)
let nextBtn = document.getElementsByClassName("next")[0]; // Selecciona el primer elemento con la clase "next" (botón de imagen siguiente)
let currentIndex = 0; // Índice de la imagen actual
let angleImages = []; // Array para almacenar las imágenes de diferentes ángulos

// Selecciona todas las imágenes dentro de los elementos con la clase "swiper-slide"
document.querySelectorAll('.swiper-slide img').forEach(img => {
    // Añade un evento de clic a cada imagen
    img.onclick = async function() {
        modal.style.display = "block"; // Muestra el modal
        angleImages = this.getAttribute('data-angles').split(','); // Obtiene los diferentes ángulos de imagen desde el atributo data-angles y los divide en un array
        modalImg.src = this.src; // Establece la fuente de la imagen del modal a la imagen seleccionada
        currentIndex = 0; // Inicializa el índice de la imagen actual a 0 para mostrar la imagen principal primero
        showImage(currentIndex); // Muestra la imagen actual basada en el índice

        // Traduce los atributos de datos
        const title = await translateText(currentLanguage === 'en' ? 'es' : 'en', currentLanguage, this.dataset.title.trim()); // Traduce el título
        const tecnica = await translateText(currentLanguage === 'en' ? 'es' : 'en', currentLanguage, this.dataset.tecnica.trim()); // Traduce la técnica
        const medidas = await translateText(currentLanguage === 'en' ? 'es' : 'en', currentLanguage, this.dataset.medidas.trim()); // Traduce las medidas
        const caption = await translateText(currentLanguage === 'en' ? 'es' : 'en', currentLanguage, this.dataset.caption.trim()); // Traduce el caption

        // Traduce las etiquetas de texto estáticas
        const [titleLabel, tecnicaLabel, medidasLabel, captionLabel] = await translateStaticText(currentLanguage === 'en' ? 'es' : 'en', currentLanguage);

        // Actualiza el contenido del modal con los textos traducidos
        captionText.innerHTML = `<p>${titleLabel} ${title} <br> ${tecnicaLabel} ${tecnica} <br> ${medidasLabel} ${medidas} <br> ${captionLabel} ${caption}</p>`;
    }
});



function showImage(index) {
    if (index >= angleImages.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = angleImages.length - 1;
    } else {
        currentIndex = index;
    }
    modalImg.src = angleImages[currentIndex];
}

prevBtn.onclick = function() {
    showImage(currentIndex - 1);
}

nextBtn.onclick = function() {
    showImage(currentIndex + 1);
}

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
        showImage(currentIndex + 1);
    } else if (event.key === 'Escape') {
        modal.style.display = "none";
        document.removeEventListener('keydown', handleKeyDown);
    }
}



// Obtiene el elemento <span> que cierra el modal

let span = document.getElementsByClassName("close")[0];

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
//     let modal = document.getElementById("imageModal");

//     // Obtiene la imagen e inserta dentro del modal, y añade el texto de caption
//     let modalImg = document.getElementById("img01");
//     let captionText = document.getElementById("caption");
//     document.querySelectorAll('.swiper-slide img').forEach(img => {
//         img.onclick = function () {
//             modal.style.display = "block";
//             modalImg.src = this.src;
//             captionText.innerHTML = this.alt;
//         }
//     });

//     // Obtiene el elemento <span> que cierra el modal
//     let span = document.getElementsByClassName("close")[0];

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


