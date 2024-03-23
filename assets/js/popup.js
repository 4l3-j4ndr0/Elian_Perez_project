// Tu JavaScript con la lógica para abrir y cerrar el popup
let btnAbrirPopup = document.getElementById('btn-abrir-popup'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function() {
    document.body.classList.add('no-scroll');
    overlay.classList.add('active');
    popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

// No necesitas un manejador de evento para 'sendMessage' si sólo deseas que el formulario se envíe normalmente.
