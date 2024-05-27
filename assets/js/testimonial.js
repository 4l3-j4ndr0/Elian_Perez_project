let swiper =new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 2500,  // Los slides cambiarán cada 2500 milisegundos (2.5 segundos)
      disableOnInteraction: false,  // Continúa la reproducción automática incluso después de la interacción del usuario
  },
  });