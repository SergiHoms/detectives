// Este archivo es el que se lanza cuando arranca el servidor.

const path = require('path');
const express = require("express");
const cors = require("cors");
const fs = require('fs'); 
const app = express();
const db = require("./src/models");
const multer = require('multer');

var corsOptions = {
  origin: ["http://localhost:8081", 'http://127.0.0.1:5500']
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/storage/tmp/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
  
const upload = multer({ storage: storage })

// Rutas de la API
var routePath="./src/routes/";

// Bucle que llama a todas las rutas de la API
fs.readdirSync(routePath).forEach(function(file) {
    require(routePath + file)(app, upload);
});

// Opertura del puerto 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});