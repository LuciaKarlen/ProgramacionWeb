const { Sequelize } = require('sequelize');

// Crear la conexión a la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Archivo donde se almacenará la base de datos SQLite
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a SQLite exitosa.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

module.exports = sequelize;

