const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

/**
 * Rota POST para criar um novo usuário.
 * Encaminha as requisições para a função `create` no `usuarioController`.
 */
router.post('/usuarios', usuarioController.create);

/**
 * Rota GET para listar todos os usuários.
 * Encaminha as requisições para a função `findAll` no `usuarioController`.
 */
router.get('/usuarios', usuarioController.findAll);

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
 * Rota PUT para atualizar um usuário pelo ID.
 * Encaminha as requisições para a função `update` no `usuarioController`.
 */
router.put('/usuarios/:id', usuarioController.update);

/**
 * Rota DELETE para deletar um usuário pelo ID.
 * Encaminha as requisições para a função `delete` no `usuarioController`.
 */
router.delete('/usuarios/:id', usuarioController.delete);

module.exports = router;