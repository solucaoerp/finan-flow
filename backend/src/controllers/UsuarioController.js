const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { ValidationError } = require('sequelize');
const { createUserSchema, updateUserSchema } = require('../validators/usuarioValidator');
const Usuario = require('../models/Usuario');
const Transacao = require('../models/Transacao');

// Configurar o fuso horário local
const TIMEZONE = 'America/Sao_Paulo';

/**
 * Busca todos os usuários cadastrados no banco de dados.
 */
exports.findAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios); // Retorna um status 200 com os usuários
    } catch (error) {
        console.error('Erro ao obter os usuários:', error);
        res.status(500).json({ message: 'Erro ao obter os usuários.' });
    }
};

/**
 * Busca um usuário pelo ID.
 */
exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error(`Erro ao buscar o usuário com ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro ao buscar o usuário.' });
    }
};

/**
 * Busca usuários por intervalo de datas de criação.
 */
exports.findByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Por favor, forneça as datas de início e fim.' });
    }
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();
    try {
        const usuarios = await Usuario.findAll({
            where: {
                criado_em: {
                    [Op.between]: [start, end]
                }
            }
        });
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado no intervalo fornecido.' });
        }
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários por intervalo de datas:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários por intervalo de datas.' });
    }
};

/**
 * Cria um novo usuário no banco de dados.
 */
exports.create = async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos', detalhes: error.details });
    }
    try {
        const { nome, email, senha_hash } = value;
        const emailExistente = await Usuario.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(409).json({ message: 'E-mail já cadastrado.' });
        }
        const novoUsuario = await Usuario.create({ nome, email, senha_hash });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
};

/**
 * Atualiza um usuário pelo ID.
 */
exports.update = async (req, res) => {
    const { id } = req.params;
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos', detalhes: error.details });
    }
    try {
        const usuarioExistente = await Usuario.findByPk(id);
        if (!usuarioExistente) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await usuarioExistente.update({
            ...value,
            atualizado_em: moment().tz(TIMEZONE).format('YYYY-MM-DD HH:mm:ss.SSS')
        });
        res.status(200).json(usuarioExistente);
    } catch (error) {
        console.error(`Erro ao atualizar o usuário com ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
    }
};

/**
 * Deleta um usuário pelo ID.
 */
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const transacoes = await Transacao.findAll({ where: { usuario_id: id } });
        if (transacoes.length > 0) {
            return res.status(400).json({ message: 'Não é possível deletar o usuário pois existem transações associadas.' });
        }
        await usuario.destroy();
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        console.error(`Erro ao deletar o usuário com ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
};
