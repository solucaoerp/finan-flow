const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');
const moment = require('moment');
const { createUserSchema } = require('../validators/usuarioValidator');

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
        const { id } = req.params; // Desestruturação para uma melhor leitura
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

    // Verificação das datas fornecidas
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Por favor, forneça as datas de início e fim.' });
    }

    // Conversão para objetos `Date` usando `moment`
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();

    console.log(`Consultando usuários entre ${start} e ${end}`);

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
    // Validar dados do corpo usando o esquema definido
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos', detalhes: error.details });
    }

    try {
        const { nome, email, senha_hash } = value;

        // Verificar se o e-mail já existe no banco de dados
        const emailExistente = await Usuario.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(409).json({ message: 'E-mail já cadastrado.' });
        }

        // Criar novo usuário
        const novoUsuario = await Usuario.create({ nome, email, senha_hash });
        res.status(201).json(novoUsuario); // Retorna 201 para criação bem-sucedida
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
};