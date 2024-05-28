// server.js

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const gatewaysRouter = require('../routes/gateways');
const path = require('path');
const mongoose = require('mongoose');


const app = express();

// Conexión a la base de datos
const db = require('../db/conexion');


const port = process.env.PORT || 3002;

app.use('/api', gatewaysRouter);
app.use(bodyParser.json());

// Configurar Express para servir archivos estáticos desde el directorio raíz del proyecto
app.use(express.static(path.join(__dirname, '..', '..')));


app.get('/',(req,res) => {
  // Construir la ruta absoluta al archivo index.html
  const indexPath = path.resolve(__dirname, '..', '..',  'index.html');
  // Enviar el archivo index.html
  res.sendFile(indexPath);
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app