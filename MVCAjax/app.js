const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');  // Conexión a la base de datos
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/products-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

// Rutas para la API
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Sincronizar base de datos y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
}).catch(error => console.log('Error al sincronizar la base de datos:', error));