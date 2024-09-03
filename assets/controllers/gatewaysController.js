require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('cross-fetch');
const bodyParser = require('body-parser');
const Testimonio = require('../db/model/testimonios');


const routerGateways = express.Router();
routerGateways.use(express.json());
const nodemailer = require("nodemailer");
const { error } = require('console');

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

const tiktokLink = async (req, res) => {
    try { 
        const response = await fetch('https://www.tiktok.com/@elianperez906?lang=es');
        if (response.ok) {
            res.redirect('https://www.tiktok.com/@elianperez906?lang=es');
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


// const biografiaLink =  (req, res) => {
//     console.log( 'en el endpoint')
//     try {
//         const biografia = path.resolve(__dirname, '..', '..', 'biografia', 'index.html');
//         res.sendFile(biografia , (err) => {
//             if (err){
//                 console.log(error.message)
//         console.error('Error:', error);
//         const errorPage = path.resolve(__dirname, '..', '..', 'error_page', 'index.html');
//         res.status(500).sendFile(errorPage);
//             }
//         });
//     } catch (error) {
//         console.log(error.message)
//         console.error('Error:', error);
//         const errorPage = path.resolve(__dirname, '..', '..', 'error_page', 'index.html');
//         res.status(500).sendFile(errorPage);
//     }
// };

const tiendaLink = async (req, res) => {
    try {
        const response = await fetch('https://fuentesartboutique.com/');
        if (response.ok) {
            res.redirect('https://fuentesartboutique.com/');
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
    


// pagina de galerias
const galeryLink = (req, res) => {
    console.log( 'en el endpoint galery')
    try {
        const grupo = req.query.grupo;  // Captura el parámetro 'grupo' desde la URL
        const pagePath = path.resolve(__dirname, '..', '..', 'error_page', 'index.html');


        if (grupo == "drawing" || grupo == "paint") {
            if (grupo == "drawing") {
                // Redirigir a la misma página con un parámetro de consulta
                res.redirect(`/drawing_page/index.html?grupo=${grupo}`);
            }
            if (grupo == "paint") {
                // Redirigir a la misma página con un parámetro de consulta
                res.redirect(`/paint_page/index.html?grupo=${grupo}`);
            }
        } else {
            // Si no hay grupo, envía la página sin parámetros de consulta
            res.sendFile(pagePath);
        }
    } catch (error) {
        console.error('Error:', error);
        const errorPage = path.resolve(__dirname, '..', '..', 'error_page', 'index.html');
        res.status(500).sendFile(errorPage);
    }
};

// SEND EMAIL
const sendEmailMethod = async (req, res) => {
    const { from_email_address, subject, message } = req.body;
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
        subject: subject,
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



// Crear un nuevo testimonio
const createTestimonios = async (req, res) => {
    try {
      console.log('Datos recibidos para nuevo testimonio:', req.body);
      const testimonio = new Testimonio(req.body);
      await testimonio.save();
      res.status(201).send(testimonio);
    } catch (error) {
      console.error('Error al crear testimonio:', error);
      res.status(400).send({ code: error.code, message: error.message });
    }
  };

  // Eliminar un testimonio por su id
  const deleteTestimonio = async (req, res) => {
    try {
        console.log("testimonio eliminar")
      const { id, email } = req.body; // Se esperan `id` y `email` en el cuerpo de la solicitud
  
      const testimonio = await Testimonio.findById(id);
      if (!testimonio) {
        return res.status(404).send({ message: 'Testimonio no encontrado' });
      }
  
      if (testimonio.email !== email) {
        return res.status(403).send({ message: 'No autorizado para eliminar este testimonio' });
      }
  
      await Testimonio.findByIdAndDelete(id);
      res.status(200).send({ message: 'Testimonio eliminado' });
    } catch (error) {
      console.error('Error al eliminar testimonio:', error);
      res.status(500).send(error);
    }
  };

// Obtener todos los usuarios
const getTestimonios = async (req, res) => {
  try {
    const testimonios = await Testimonio.find();
    console.log('Testimonios recuperados:', testimonios);
    res.status(200).send(testimonios);
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error);
  }
};





module.exports = {
    instagramLink,
    externalLink,
    facebookLink,
    sendEmailMethod,
    tiktokLink,
    galeryLink,
    tiendaLink,
    createTestimonios,
    getTestimonios,
    deleteTestimonio,
    // biografiaLink,
};
