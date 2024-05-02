/**
 * Módulo de roteamento para usuários.
 * Este módulo define as rotas relacionadas às operações com usuários na aplicação.
 * @module routes/usuarios
 */

const express = require('express');
const router = express.Router();  // Cria uma instância de um novo router
const usuarioController = require('../controllers/UsuarioController'); // Importa o controlador de usuários

/**
 * Rota GET para listar todos os usuários.
 * Esta rota encaminha as requisições para a função `listarUsuarios` no `usuarioController`.
 *
 * @path {GET} /usuarios
 * @code {200} Se a operação for bem-sucedida, retorna uma lista de usuários.
 * @code {500} Se houver erro na operação de recuperação de dados.
 * @response {Array<Object>} Lista de usuários no formato JSON se bem-sucedida.
 * @response {Object} Mensagem de erro em caso de falha na operação.
 *
 * @example
 * // Exemplo de resposta bem-sucedida:
 * // HTTP/1.1 200 OK
 * // [
 * //   {
 * //     "usuario_id": 1,
 * //     "nome": "João Silva",
 * //     "email": "joao.silva@example.com",
 * //     "senha_hash": "hashsenha1",
 * //     "criado_em": "2024-05-02 15:52:38",
 * //     "atualizado_em": "2024-05-02 15:52:38"
 * //   },
 * //   {
 * //     "usuario_id": 2,
 * //     "nome": "Ana Costa",
 * //     "email": "ana.costa@example.com",
 * //     "senha_hash": "hashsenha2",
 * //     "criado_em": "2024-05-02 15:52:38",
 * //     "atualizado_em": "2024-05-02 15:52:38"
 * //   }
 * // ]
 */
router.get('/usuarios', usuarioController.listarUsuarios);

module.exports = router;