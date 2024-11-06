const Product = require('../models/productModel');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
};

// Crear nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, code, quantity, price } = req.body;
        await Product.create({ name, code, quantity, price });
        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        res.status(500).send('Error al crear el producto');
    }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.destroy({ where: { id: productId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error al eliminar el producto');
    }
};

// Editar producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, code, quantity, price } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        product.name = name;
        product.code = code;
        product.quantity = quantity;
        product.price = price;
        await product.save();
        res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el producto');
    }
};
