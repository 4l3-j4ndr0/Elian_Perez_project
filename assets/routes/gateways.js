// routes/gateways.js

const express = require('express');
const router = express.Router();
router.use(express.json())
const gatewaysController = require('../controllers/gatewaysController');

const { validateCreate } = require('../validator/gateway');


// ############  manejo de rutas externas  ###########
// ruta errada de prueba
router.get('/externalLink', gatewaysController.externalLink);
// instagram
router.get('/instagramLink', gatewaysController.instagramLink);
// facebook
router.get('/facebookLink', gatewaysController.facebookLink);
// tiktok
router.get('/tiktokLink', gatewaysController.tiktokLink);

// biografia
// router.get('/biografiaLink', gatewaysController.biografiaLink);

// tienda
router.get('/tiendaLink', gatewaysController.tiendaLink);
// galery
router.get('/galeryLink', gatewaysController.galeryLink);
// send email
router.post('/send-email', gatewaysController.sendEmailMethod);


module.exports = router;
