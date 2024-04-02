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

function formIsValid () {
    let result = false;

  // Validar el email
  if (!email.value) {
    console.error('El campo de correo está vacío.');
    formIsValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    console.error('El correo proporcionado no es válido.');
    formIsValid = false;
  }

  // Validar el asunto
  if (!subject) {
    console.error('El campo asunto está vacío.');
    formIsValid = false;
  }

  // Validar el mensaje
  if (!message) {
    console.error('El campo de mensaje está vacío.');
    formIsValid = false;
  }

  // Si alguno de los campos no es válido, prevenir que el formulario se envíe
  if (!formIsValid) {
    event.preventDefault();
  }
}