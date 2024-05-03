/**
 * Controller para gerenciar as operações relacionadas aos usuários.
 * @module controllers/UsuarioController
 */

const Usuario = require('../models/Usuario');

/**
 * Lista todos os usuários cadastrados no banco de dados.
 * Esta função é um controlador express que trata a requisição GET para listar usuários.
 *
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} res - O objeto de resposta do Express.
 * 
 * @returns {void} - A função não retorna nenhum valor diretamente, mas envia uma resposta HTTP.
 * 
 * Processo:
 * 1. Tenta buscar todos os usuários utilizando o método `findAll()` do modelo `Usuario`.
 * 2. Se bem-sucedido, loga os usuários recuperados e envia de volta como resposta JSON.
 * 3. Se ocorrer um erro durante a consulta ao banco de dados, loga o erro e envia uma resposta de erro 500.
 *
 * @example
 * // GET /api/usuarios
 * // Chamada HTTP para listar todos os usuários
 * router.get('/usuarios', usuarioController.listarUsuarios);
 */
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        //console.log(usuarios); // Verifica se os usuários foram recuperados com sucesso
        res.send(usuarios);
    } catch (error) {
        //console.error(error); // Verifica se há algum erro durante a execução da consulta
        res.status(500).send({
            message: 'Erro ao obter os usuários'
        });
    }
};

/*
    exports.listarUsuarios = async (req, res) => {
        res.send([{ nome: "Teste", email: "teste@teste.com" }]);
    };
*/
