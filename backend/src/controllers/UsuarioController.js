const Usuario = require('../models/Usuario');

/**
 * Busca todos os usuários cadastrados no banco de dados.
 */
exports.findAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao obter os usuários'
        });
    }
};

/**
 * Busca um usuário pelo ID.
 */
exports.findById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.send(usuario);
        } else {
            res.status(404).send({
                message: 'Usuário não encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao buscar o usuário'
        });
    }
};