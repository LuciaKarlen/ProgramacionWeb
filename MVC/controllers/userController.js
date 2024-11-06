const User = require('../models/userModel');

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('index', { users });
        } catch (error) {
            res.status(500).send("Error al obtener usuarios.");
        }
    },

    create: async (req, res) => {
        const { name, email, dni } = req.body;
        try {
            await User.create({ name, email, dni });
            res.redirect('/');
        } catch (error) {
            res.status(500).send("Error al crear usuario: " + error);
        }
    },

    delete: async (req, res) => {
        const { email } = req.body;
        try{
            await User.destroy({ where: { email } });
            res.redirect('');
        } catch (error) {
            res.status(500).send("Error al eliminar el usuario" + error.message);
        }
    },

    deleteUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('deleteUser', { users });
        } catch (error) {
            res.status(500).send("Error al obtener usuarios.");
        }
    },
};