const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

/**
 * Rota POST para criar um novo usuário.
 * Encaminha as requisições para a função `create` no `usuarioController`.
 */
router.post('/usuarios', usuarioController.create);

/**
 * Rota GET para buscar usuários por um intervalo de datas de criação.
 * Encaminha as requisições para a função `findByDateRange` no `usuarioController`.
 */
router.get('/usuarios/dates', usuarioController.findByDateRange);

/**
 * Rota GET para buscar um usuário pelo ID.
 * Encaminha as requisições para a função `findById` no `usuarioController`.
 */
router.get('/usuarios/:id', usuarioController.findById);

/**
 * Rota GET para listar todos os usuários.
 * Encaminha as requisições para a função `findAll` no `usuarioController`.
 */
router.get('/usuarios', usuarioController.findAll);

module.exports = router;
