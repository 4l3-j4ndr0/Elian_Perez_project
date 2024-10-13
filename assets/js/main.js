jQuery(window).on('load', function () {
  "use strict";


  // HIDE PRELOADER
  $(".preloader").addClass("hide-preloader");

  // SHOW/ANIMATE ANIMATION CONTAINER
  setTimeout(function () {

    $("#intro .animation-container").each(function () {

      var e = $(this);

      setTimeout(function () {

        e.addClass("run-animation");

      }, e.data("animation-delay"));

    });

  }, 800);


});


jQuery(document).ready(function ($) {
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
  $(document).on('click', 'a.smooth-scroll', function (event) {

    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
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
    responsive: {
      800: {
        items: 3,
      },
    }
  });


});

// ######################   change text of button send email   ###################### 

// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function () {
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

// ######################   SEND MESSAGE   ######################
document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const form = document.getElementById('myForm');
  const btnSendMessage = document.getElementById('sendMessage');

  // Funciones de validación
  function addErrorStyles(input) {
    input.classList.add('input-error');
    input.classList.remove('input-success');
  }

  function addSuccessStyles(input) {
    input.classList.remove('input-error');
    input.classList.add('input-success');
  }

  function validateInput(input) {
    if (!input.value) {
      addErrorStyles(input);
      return false;
    } else {
      addSuccessStyles(input);
      return true;
    }
  }

  function validateEmail(input) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(input.value)) {
      addErrorStyles(input);
      return false;
    } else {
      addSuccessStyles(input);
      return true;
    }
  }

  // Agregar event listeners a los campos de entrada
  emailInput.addEventListener('blur', function() {
    validateEmail(this);
  });

  subjectInput.addEventListener('blur', function() {
    validateInput(this);
  });

  messageInput.addEventListener('blur', function() {
    validateInput(this);
  });

  // Eliminar estilos de error mientras el usuario está escribiendo
  [emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
      if (this.classList.contains('input-error')) {
        this.classList.remove('input-error');
      }
    });
  });

  // Manejo del envío del formulario
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío por defecto

    // Validación de los campos
    const isEmailValid = validateEmail(emailInput);
    const isSubjectValid = validateInput(subjectInput);
    const isMessageValid = validateInput(messageInput);

    if (isEmailValid && isSubjectValid && isMessageValid) {
      btnSendMessage.classList.add('animate');
      btnSendMessage.disabled = true; // Deshabilitar el botón mientras se envía el formulario

      // Recoger los datos del formulario
      const formData = {
        from_email_address: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
      };

      // Enviar los datos al servidor
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Respuesta de red no fue ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          // Acciones en caso de éxito
          console.log('Correo enviado: ', data.message);
          btnSendMessage.classList.remove('animate');
          btnSendMessage.textContent = ''
          btnSendMessage.classList.add('success');
          setTimeout(() => {
            event.target.classList.remove('success');
            btnSendMessage.textContent = 'Enviar'
              cerrarPopup()
              // Aquí puedes agregar más acciones después de que la clase 'success' ha sido mostrada por 3 segundos
          }, 1500); // 3000 milisegundos = 3 segundos
        } else {
          // Acciones en caso de fallo
          console.error('No se pudo enviar el correo sin error: ', data);
          console.error('No se pudo enviar el correo con error: ', data.error);
          btnSendMessage.classList.remove('animate');
          btnSendMessage.textContent = ''
          btnSendMessage.classList.add('error');
        }
      })
      .catch(error => {
        alert(error.message)
        console.error('Error durante el envío: ', error);
        btnSendMessage.classList.remove('animate');
          btnSendMessage.textContent = ''
        btnSendMessage.classList.add('error');
      })
      .finally(() => {
        // Restablecer el formulario y el botón después de 3 segundos
        setTimeout(() => {
          btnSendMessage.classList.remove('animate', 'success', 'error');
          btnSendMessage.disabled = false;
          btnSendMessage.textContent = 'Enviar';
        }, 3000);
      });
    } else {
      // Si hay campos no válidos, mostrar la animación de error
      [emailInput, subjectInput, messageInput].forEach(input => {
        if (!input.value || (input === emailInput && !validateEmail(input))) {
          addErrorStyles(input);
        }
      });
    }
  });
});

// Toggle lista idiomas
document.addEventListener('DOMContentLoaded', function() {
  // Obtener el botón de traducción y el menú desplegable
  const translateButton = document.getElementById('Anutrickz_translateBTN');
  const langList = document.getElementById('ATLang_list');

  // Agregar un evento de clic al botón de traducción
  translateButton.addEventListener('click', function() {
      // Alternar la clase 'hide' para mostrar/ocultar el menú
      langList.classList.toggle('hide');
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener('click', function(event) {
      if (!translateButton.contains(event.target) && !langList.contains(event.target)) {
          langList.classList.add('hide');
      }
  });
});


// cerrar automaticamente el menu en version movil al tocar alguna opcion
document.querySelectorAll('.navigation-items a').forEach(link => {
  link.addEventListener('click', function () {
    const navbarCollapse = document.querySelector('#navbar');
    if (navbarCollapse.classList.contains('in') || navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('in');
      navbarCollapse.classList.remove('show');
    }
  });
});
