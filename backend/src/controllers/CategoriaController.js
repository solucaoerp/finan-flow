const { Op } = require('sequelize');
const moment = require('moment-timezone');
const Categoria = require('../models/Categoria');
const { createCategoriaSchema, updateCategoriaSchema } = require('../validators/categoriaValidator');
const Transacao = require('../models/Transacao');

// Configurar o fuso horário local
const TIMEZONE = 'America/Sao_Paulo';

/**
 * Busca todas as categorias cadastradas no banco de dados.
 */
exports.findAll = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Erro ao obter as categorias:', error);
        res.status(500).json({ message: 'Erro ao obter as categorias.' });
    }
};

/**
 * Busca uma categoria pelo ID.
 */
exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        console.error(`Erro ao buscar a categoria com ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Erro ao buscar a categoria.' });
    }
};

/**
 * Busca categorias por intervalo de datas de criação.
 */
exports.findByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Por favor, forneça as datas de início e fim.' });
    }
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();
    try {
        const categorias = await Categoria.findAll({
            where: {
                criado_em: {
                    [Op.between]: [start, end]
                }
            }
        });
        if (categorias.length === 0) {
            return res.status(404).json({ message: 'Nenhuma categoria encontrada no intervalo fornecido.' });
        }
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Erro ao buscar categorias por intervalo de datas:', error);
        res.status(500).json({ message: 'Erro ao buscar categorias por intervalo de datas.' });
    }
};

/**
 * Cria uma nova categoria no banco de dados.
 */
exports.create = async (req, res) => {
    const { error, value } = createCategoriaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos', detalhes: error.details });
    }
    try {
        const novaCategoria = await Categoria.create(value);
        res.status(201).json(novaCategoria);
    } catch (error) {
        console.error('Erro ao criar a categoria:', error);
        res.status(500).json({ message: 'Erro ao criar a categoria.' });
    }
};

/**
 * Atualiza uma categoria pelo ID.
 */
exports.update = async (req, res) => {
    const { id } = req.params;
    const { error, value } = updateCategoriaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos', detalhes: error.details });
    }
    try {
        const categoriaExistente = await Categoria.findByPk(id);
        if (!categoriaExistente) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }
        await categoriaExistente.update(value, {
            fields: ['nome', 'tipo']
        });
        res.status(200).json(categoriaExistente);
    } catch (error) {
        console.error(`Erro ao atualizar a categoria com ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao atualizar a categoria.' });
    }
};

/**
 * Deleta uma categoria pelo ID.
 * Verifica se há produtos associados antes de deletar.
 */
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Verificando existência de transações associadas à categoria ID:", id);
        const transacoes = await Transacao.findAll({ where: { categoria_id: id } });
        console.log("Transações encontradas:", transacoes);
        
        if (transacoes.length > 0) {
            return res.status(400).json({ message: 'Categoria não pode ser deletada pois há transações associadas.' });
        }

        console.log("Procurando categoria para deletar...");
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        console.log("Deletando categoria...");
        await categoria.destroy();
        res.status(200).json({ message: 'Categoria deletada com sucesso.' });
    } catch (error) {
        console.error(`Erro ao deletar a categoria com ID ${id}:`, error);
        res.status(500).json({ message: 'Erro ao deletar a categoria.', error: error.message });
    }
};


