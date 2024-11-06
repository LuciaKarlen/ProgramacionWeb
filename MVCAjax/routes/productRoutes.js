const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas
router.get('/', productController.getProducts);
router.post('/add', productController.createProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/edit/:id', productController.updateProduct);

module.exports = router;
