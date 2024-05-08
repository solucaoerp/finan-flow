const Joi = require('joi');

// Esquema base para os campos da categoria
const baseCategoriaSchema = {
    nome: Joi.string().min(1).max(255), // Define que o nome deve ter pelo menos 1 caractere e no máximo 255
    tipo: Joi.string().valid('receita', 'despesa') // Restringe o campo tipo a ser 'receita' ou 'despesa'
};

// Esquema de criação, todos os campos são obrigatórios
const createCategoriaSchema = Joi.object({
    ...baseCategoriaSchema,
    nome: baseCategoriaSchema.nome.required(), // Torna o campo nome obrigatório
    tipo: baseCategoriaSchema.tipo.required()  // Torna o campo tipo obrigatório
});

// Esquema de atualização, todos os campos são opcionais mas ainda validados
const updateCategoriaSchema = Joi.object({
    ...baseCategoriaSchema
});

module.exports = {
    createCategoriaSchema,
    updateCategoriaSchema
};