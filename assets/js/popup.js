let btnAbrirPopup = document.getElementById('btn-abrir-popup'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');
    btnSendMessage = document.getElementById('sendMessage');

btnAbrirPopup.addEventListener('click', function(){
    document.body.classList.add('no-scroll'); // Añade la clase para bloquear el desplazamiento
	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
    document.body.classList.remove('no-scroll'); // Elimina la clase para permitir el desplazamiento
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

btnSendMessage.addEventListener('click', function(e){
	e.preventDefault();
    document.body.classList.remove('no-scroll'); // Elimina la clase para permitir el desplazamiento
	overlay.classList.remove('active');
	popup.classList.remove('active');
});