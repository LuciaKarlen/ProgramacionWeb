const User = require('../models/userModel');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Crear nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        await User.create({ name, email });
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.destroy({ where: { id: userId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
};

// Editar usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
};