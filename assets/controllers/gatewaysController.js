const express = require('express');
const path = require('path');
const fetch = require('cross-fetch');

const routerGateways = express.Router();
routerGateways.use(express.json());

const app = express();
// Configurar Express para servir archivos estáticos desde la carpeta 'assets_error'
// app.use('/error_page/assets_error', express.static(path.join(__dirname, '..', '..', 'error_page', 'assets_error')));
app.use(express.static(path.join(__dirname, '..', '..', 'error_page', 'assets_error')));

const externalLink = async (req, res) => {
    try {
        const response = await fetch('https://www.error-link.com');
        if (response.ok) {
            res.redirect('https://www.error-link.com');
        } else {
            res.status(500).send('Error: No se pudo acceder a la página externa');
        }
    } catch (error) {
        const errorPage = path.resolve(__dirname, '..', '..', 'error_page', 'index.html');
        const errorPageCSS = path.resolve(__dirname, '..', '..', 'error_page', 'assets_error');
        console.log(errorPage)
        console.log(errorPageCSS)
        res.status(500).sendFile(errorPage);
    }
};

const instagramLink = async (req, res) => {
    try {
        const response = await fetch('https://www.instagram.com/perez_fuentes_art/');
        if (response.ok) {
            res.redirect('https://www.instagram.com/perez_fuentes_art/');
        } else {
            res.status(500).send('Error: No se pudo acceder a la página externa');
        }
    } catch (error) {
        const errorPage = path.resolve(__dirname, '..', '..', 'error_page', 'index.html');
        const errorPageCSS = path.resolve(__dirname, '..', '..', 'error_page', 'assets_error');
        console.log(errorPage)
        console.log(errorPageCSS)
        res.status(500).sendFile(errorPage);
    }
};

module.exports = {
    instagramLink,
    externalLink,
   
};
