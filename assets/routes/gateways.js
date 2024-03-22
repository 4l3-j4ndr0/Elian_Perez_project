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


module.exports = router;
