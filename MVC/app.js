const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Motor de vistas
app.set('view engine', 'hbs');

// Rutas
app.use('/', userRoutes);

// Sincronización con la base de datos y arranque del servidor
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});