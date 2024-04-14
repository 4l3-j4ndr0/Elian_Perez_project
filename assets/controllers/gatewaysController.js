require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('cross-fetch');
const bodyParser = require('body-parser');


const routerGateways = express.Router();
routerGateways.use(express.json());
const nodemailer = require("nodemailer");

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

const facebookLink = async (req, res) => {
    try {
        const response = await fetch('https://www.facebook.com/profile.php?id=100088398292878');
        if (response.ok) {
            res.redirect('https://www.facebook.com/profile.php?id=100088398292878');
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

// SEND EMAIL
const sendEmailMethod = async (req, res) => {
    const  { from_email_address, subject, message } = req.body;
    console.log(req.body);
// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.TO_EMAIL_ADDRESS,
      pass: process.env.NAME_APP_PASS,
    },
  });

 // Definir el contenido del cuepro para el correo electrónico que deseas enviar
 const mailOptions = {
    to: process.env.TO_EMAIL_ADDRESS,
    subject: subject ,
    text: `${message}

    FROM: ${from_email_address}`,
  };
  // Envía el correo electrónico utilizando el método sendMail del objeto transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
      res.json({ success: false, message: error.message }); // Asegúrate de enviar un estado de fallo adecuado.
    } else {
      console.log("Correo enviado:", info.response);
      res.json({ success: true, message: 'Correo enviado exitosamente.' });
    }
  });
};


module.exports = {
    instagramLink,
    externalLink,
    facebookLink,
    sendEmailMethod,
};
