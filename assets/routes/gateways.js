// routes/gateways.js

const express = require('express');
const router = express.Router();
router.use(express.json())
const gatewaysController = require('../controllers/gatewaysController');

const { validateCreate } = require('../validator/gateway');



// Ruta para manejar la redirección a la página web externa
router.get('/externalLink', gatewaysController.externalLink);


/*
// show gateway by serial number with their devices
router.get('/gateways/:serialNumber/device', gatewaysController.getGatewayBySerialNumberWithDevices); //

// create a new gateway
router.post('/create/gateways',validateCreate , gatewaysController.createGateway);

// create device at the gateway
router.post('/create/device/:serialNumber',validateCreateDevice, gatewaysController.addDeviceToGateway);

// delete device from gateway
router.delete('/gateways/:serialNumber/devices/:deviceUid', gatewaysController.removeDeviceFromGateway);
*/

module.exports = router;
