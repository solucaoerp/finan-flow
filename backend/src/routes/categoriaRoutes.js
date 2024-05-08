const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');

/**
 * Rota POST para criar uma nova categoria.
 * Encaminha as requisições para a função `create` no `categoriaController`.
 */
router.post('/categorias', categoriaController.create);

/**
 * Rota GET para listar todas as categorias.
 * Encaminha as requisições para a função `findAll` no `categoriaController`.
 */
router.get('/categorias', categoriaController.findAll);

/**
 * Rota GET para buscar categorias por um intervalo de datas de criação.
 * Encaminha as requisições para a função `findByDateRange` no `categoriaController`.
 */
router.get('/categorias/dates', categoriaController.findByDateRange);

/**
 * Rota GET para buscar uma categoria pelo ID.
 * Encaminha as requisições para a função `findById` no `categoriaController`.
 */
router.get('/categorias/:id', categoriaController.findById);

/**
 * Rota PUT para atualizar uma categoria pelo ID.
 * Encaminha as requisições para a função `update` no `categoriaController`.
 */
router.put('/categorias/:id', categoriaController.update);

/**
 * Rota DELETE para deletar uma categoria pelo ID.
 * Encaminha as requisições para a função `delete` no `categoriaController`.
 */
router.delete('/categorias/:id', categoriaController.delete);

module.exports = router;
