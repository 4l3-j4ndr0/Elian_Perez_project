// Constantes de configuración de la API
const API_URL = 'https://google-translate113.p.rapidapi.com/api/v1/translator/html'; // URL de la API de traducción
const API_KEY = '89387b580fmshe2cf472c74ae2b3p1369c2jsn23705a77bf37'; // Clave de la API
const API_HOST = 'google-translate113.p.rapidapi.com'; // Host de la API

// Variable local para almacenar el idioma actual
let currentLanguage = null; // Inicializa la variable para el idioma actual

// Función para verificar si localStorage está disponible
const isLocalStorageAvailable = () => {
    try {
        const test = '__storage_test__'; // Clave de prueba
        localStorage.setItem(test, test); // Intenta almacenar el ítem de prueba
        localStorage.removeItem(test); // Elimina el ítem de prueba
        return true; // Si no hay errores, localStorage está disponible
    } catch (e) {
        return false; // Si hay un error, localStorage no está disponible
    }
};

// Función para guardar datos en localStorage con manejo de errores
const saveToLocalStorage = (key, value) => {
    if (isLocalStorageAvailable()) {
        try {
            localStorage.setItem(key, value); // Intenta guardar el ítem en localStorage
            currentLanguage = value; // Actualiza la variable local
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                console.error('LocalStorage está lleno, por favor limpia algo de espacio.'); // Error por falta de espacio en localStorage
                currentLanguage = value; // Utiliza la variable local si localStorage está lleno
            } else {
                console.error('Error al guardar en localStorage', e); // Otro error al guardar en localStorage
            }
        }
    } else {
        console.warn('localStorage no está disponible'); // Advertencia si localStorage no está disponible
        currentLanguage = value; // Utiliza la variable local si localStorage no está disponible
    }
};

// Función para traducir el contenido combinado de todos los elementos
const translateContent = async (fromLang, toLang) => {
    const elements = document.querySelectorAll('.translate-content'); // Selecciona todos los elementos con la clase 'translate-content'
    let combinedContent = ''; // Variable para almacenar el contenido combinado
    const originalContents = []; // Array para almacenar los contenidos originales

    // Combina el contenido de todos los elementos
    elements.forEach(element => {
        originalContents.push(element.innerHTML); // Guarda el contenido original
        combinedContent += `<div>${element.innerHTML}</div>`; // Añade el contenido al combinado
        element.setAttribute('data-original-content', element.innerHTML); // Almacena el contenido original en un atributo data
    });

    const options = {
        method: 'POST', // Método HTTP
        headers: {
            'x-rapidapi-key': API_KEY, // Clave de la API
            'x-rapidapi-host': API_HOST, // Host de la API
            'Content-Type': 'application/json' // Tipo de contenido
        },
        body: JSON.stringify({
            from: fromLang, // Idioma de origen
            to: toLang, // Idioma de destino
            html: combinedContent // Contenido HTML combinado
        })
    };

    try {
        const response = await fetch(API_URL, options); // Realiza la solicitud a la API
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Maneja el error HTTP
        
        const result = await response.json(); // Convierte la respuesta a JSON
        console.log('Translation result:', result); // Muestra el resultado para depuración
        if (result && result.trans) {
            const parser = new DOMParser(); // Crea un parser DOM
            const doc = parser.parseFromString(result.trans, 'text/html'); // Convierte el HTML traducido en un documento
            const translatedContents = doc.body.querySelectorAll('div'); // Selecciona todos los divs en el documento traducido

            // Asigna el contenido traducido a cada elemento original
            translatedContents.forEach((translatedElement, index) => {
                elements[index].innerHTML = translatedElement.innerHTML;
            });

            saveToLocalStorage('currentLanguage', toLang); // Guarda el idioma actual en localStorage
        } else {
            console.error('Error: "trans" no encontrado en la respuesta'); // Error si no se encuentra 'trans' en la respuesta
        }
    } catch (error) {
        console.error('Error traduciendo el contenido:', error); // Maneja cualquier otro error
    }
};

// Función para traducir un texto individual
const translateText = async (fromLang, toLang, text) => {
    const options = {
        method: 'POST', // Método HTTP
        headers: {
            'x-rapidapi-key': API_KEY, // Clave de la API
            'x-rapidapi-host': API_HOST, // Host de la API
            'Content-Type': 'application/json' // Tipo de contenido
        },
        body: JSON.stringify({
            from: fromLang, // Idioma de origen
            to: toLang, // Idioma de destino
            html: text // Texto a traducir
        })
    };

    try {
        const response = await fetch(API_URL, options); // Realiza la solicitud a la API
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Maneja el error HTTP
        
        const result = await response.json(); // Convierte la respuesta a JSON
        console.log('Translation result:', result); // Muestra el resultado para depuración
        return result && result.trans ? result.trans : text; // Devuelve el texto traducido si existe, sino el texto original
    } catch (error) {
        console.error('Error traduciendo el texto:', error); // Maneja cualquier otro error
        return text; // Devuelve el texto original si hay un error
    }
};

// Función para traducir etiquetas de texto estáticas
const translateStaticText = async (fromLang, toLang) => {
    const staticTexts = ['Titulo:', 'Tecnica:', 'Dimenciones:', 'Expuesto:']; // Textos estáticos a traducir
    const translations = await Promise.all(staticTexts.map(text => translateText(fromLang, toLang, text))); // Traduce todos los textos estáticos
    return translations; // Devuelve las traducciones
};

// Función para traducir placeholders en el formulario
const translatePlaceholders = async (fromLang, toLang) => {
    const placeholders = {
        email: 'Tu correo', // Placeholder para el email
        subject: 'Tema', // Placeholder para el asunto
        message: 'Mensaje' // Placeholder para el mensaje
    };
    const translatedPlaceholders = {}; // Objeto para almacenar los placeholders traducidos

    for (const key in placeholders) {
        translatedPlaceholders[key] = await translateText(fromLang, toLang, placeholders[key]); // Traduce cada placeholder
    }

    return translatedPlaceholders; // Devuelve los placeholders traducidos
};

// Función para aplicar la traducción al cargar la página
const applyTranslationOnLoad = async () => {
    console.log('Aplicando traducción al cargar...'); // Muestra en consola que se está aplicando la traducción
    if (isLocalStorageAvailable()) {
        currentLanguage = localStorage.getItem('currentLanguage'); // Obtiene el idioma de localStorage
    }
    if (currentLanguage && currentLanguage === 'en') {
        const fromLang = 'es'; // Idioma de origen
        console.log(`Traduciendo de ${fromLang} a ${currentLanguage}`); // Muestra en consola la traducción que se realizará
        await translateContent(fromLang, currentLanguage); // Traduce el contenido
        const placeholders = await translatePlaceholders(fromLang, currentLanguage); // Traduce los placeholders
        document.getElementById('email').placeholder = placeholders.email; // Aplica el placeholder traducido
        document.getElementById('subject').placeholder = placeholders.subject; // Aplica el placeholder traducido
        document.getElementById('message').placeholder = placeholders.message; // Aplica el placeholder traducido
        handleIconShadow(true); // Aplicar sombreado si el idioma es inglés
    } else {
        handleIconShadow(false); // Quitar sombreado si el idioma no es inglés
    }
};

// Función para manejar la traducción de contenido y placeholders
const handleTranslation = async (fromLang, toLang) => {
    await translateContent(fromLang, toLang); // Traduce el contenido
    const placeholders = await translatePlaceholders(fromLang, toLang); // Traduce los placeholders
    document.getElementById('email').placeholder = placeholders.email; // Aplica el placeholder traducido
    document.getElementById('subject').placeholder = placeholders.subject; // Aplica el placeholder traducido
    document.getElementById('message').placeholder = placeholders.message; // Aplica el placeholder traducido
};

// Función para remover la traducción y restaurar el contenido original
const removeTranslation = () => {
    const elements = document.querySelectorAll('.translate-content'); // Selecciona todos los elementos con la clase 'translate-content'
    elements.forEach(element => {
        element.innerHTML = element.getAttribute('data-original-content'); // Restaurar el contenido original
    });
    // Restaurar los placeholders originales
    document.getElementById('email').placeholder = 'Tu correo';
    document.getElementById('subject').placeholder = 'Tema';
    document.getElementById('message').placeholder = 'Mensaje';
    localStorage.removeItem('currentLanguage'); // Eliminar el idioma del localStorage
};

// Función para aplicar y quitar sombreado del icono
const handleIconShadow = (add) => {
    const translateIcon = document.getElementById('translate-icon'); // Selecciona el ícono de traducción
    translateIcon.style.filter = add ? 'drop-shadow(0 0 5px rgb(14, 232, 14))' : 'none'; // Aplica o quita el sombreado
};

// Espera a que el DOM esté completamente cargado antes de ejecutar cualquier script
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners para los iconos de las banderas
    const translateEnButton = document.getElementById('translate-en'); // Selecciona el botón de traducción al inglés
    const translateEsButton = document.getElementById('translate-es'); // Selecciona el botón de traducción al español

    if (translateEnButton) {
        translateEnButton.addEventListener('click', () => {
            handleTranslation('es', 'en'); // Traduce el contenido al inglés
            handleIconShadow(true); // Aplica el sombreado verde
        });
    }

    if (translateEsButton) {
        translateEsButton.addEventListener('click', () => {
            removeTranslation(); // Remueve la traducción
            handleIconShadow(false); // Quita el sombreado verde
        });
    }

    // Aplica la traducción al cargar la página
    applyTranslationOnLoad();

    // Traducción del texto al pasar el mouse por encima del botón
    const emailSpan = document.querySelector('.email-text span'); // Selecciona el span del texto del botón
    const originalText = emailSpan.textContent; // Guarda el texto original

    const updateHoverText = async () => currentLanguage === 'en' ? 'Send E-mail' : 'Enviar E-mail'; // Determina el texto según el idioma actual

    const mouseOver = async () => {
        emailSpan.textContent = await updateHoverText(); // Actualiza el texto al pasar el mouse por encima
    };

    const mouseOut = () => {
        emailSpan.textContent = originalText; // Restaura el texto original al retirar el mouse
    };

    emailSpan.parentNode.addEventListener('mouseover', mouseOver); // Añade el listener para pasar el mouse por encima
    emailSpan.parentNode.addEventListener('mouseout', mouseOut); // Añade el listener para retirar el mouse
});
