const Joi = require('joi');

// Esquema base para os campos do usuário
const baseUserSchema = {
    nome: Joi.string().min(1),
    email: Joi.string().email(),
    senha_hash: Joi.string().min(8)
};

// Esquema de criação, todos os campos são obrigatórios
const createUserSchema = Joi.object({
    ...baseUserSchema,
    nome: baseUserSchema.nome.required(),
    email: baseUserSchema.email.required(),
    senha_hash: baseUserSchema.senha_hash.required()
});

// Esquema de atualização, todos os campos são opcionais
const updateUserSchema = Joi.object({
    ...baseUserSchema
});

module.exports = {
    createUserSchema,
    updateUserSchema
};
