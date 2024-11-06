const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Archivo de configuración de Sequelize
const Proveedor = require('./proveedor');

const Producto = sequelize.define('Producto', {
  cod_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  idProveedor: {
    type: DataTypes.INTEGER,
    references: {
        model: 'proveedores',
        key: 'id',
    },
    allowNull: false
  }
}, {
  tableName: 'productos',  // Nombre de la tabla en la base de datos SQLite
  timestamps: true,       // Para que Sequelize maneje createdAt y updatedAt
});


Producto.belongsTo(Proveedor, {foreignKey: 'idProveedor', as: 'proveedor'})

module.exports = Producto;