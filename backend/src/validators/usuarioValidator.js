const Joi = require('joi');

const createUserSchema = Joi.object({
    nome: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    senha_hash: Joi.string().min(8).required()
});

module.exports = {
    createUserSchema
};
