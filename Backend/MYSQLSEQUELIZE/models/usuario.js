const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Archivo de configuración de Sequelize

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',  // Nombre de la tabla en la base de datos SQLite
  timestamps: true,       // Para que Sequelize maneje createdAt y updatedAt
});

module.exports = Usuario;