// Tu JavaScript con la lógica para abrir y cerrar el popup
let btnAbrirPopup = document.getElementById('btn-abrir-popup'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');
    inputEmail = document.getElementById('email')
    inputSubjet = document.getElementById('subject')
    inputMessage = document.getElementById('message')
    btnSendMessage = document.getElementById('sendMessage')

btnAbrirPopup.addEventListener('click', function() {
    document.body.classList.add('no-scroll');
    overlay.classList.add('active');
    popup.classList.add('active');
});

function cerrarPopup() {
    inputEmail.value = ''
    inputSubjet.value = ''
    inputMessage.value = ''
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('active');
    popup.classList.remove('active');
    console.log('cerre el boton')
} 

btnCerrarPopup.addEventListener('click', function(e) {
    e.preventDefault();
    cerrarPopup()
});

