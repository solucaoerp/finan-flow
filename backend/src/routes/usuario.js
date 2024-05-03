const express = require('express');
const router = express.Router(); // Cria uma instância de um novo router
const usuarioController = require('../controllers/UsuarioController'); // Importa o controlador de usuários

/**
 * Rota GET para listar todos os usuários.
 * Encaminha as requisições para a função `findAll` no `usuarioController`.
 */
router.get('/usuarios', usuarioController.findAll);

/**
 * Rota GET para buscar um usuário pelo ID.
 * Encaminha as requisições para a função `findById` no `usuarioController`.
 */
router.get('/usuarios/:id', usuarioController.findById);

module.exports = router;