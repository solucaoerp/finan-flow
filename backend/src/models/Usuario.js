/**
 * Módulo que define o modelo de Usuario para interação com a tabela Usuarios no banco de dados.
 * @module Usuario
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Modelo Usuario definido usando o Sequelize para mapear objetos Usuario para a tabela Usuarios no banco de dados.
 * 
 * Campos do Modelo:
 * @field {Integer} usuario_id - Identificador único do usuário, é a chave primária, auto-incrementável.
 * @field {String} nome - Nome do usuário, não pode ser nulo.
 * @field {String} email - Email do usuário, deve ser único e não nulo.
 * @field {String} senha_hash - Hash da senha do usuário, não pode ser nulo.
 * @field {Date} criado_em - Data e hora de criação do registro, configurado para usar a data e hora atual por padrão.
 * @field {Date} atualizado_em - Data e hora da última atualização do registro, configurado para usar a data e hora atual por padrão.
 * 
 * Configurações do Modelo:
 * @config {Boolean} timestamps - Desativado para evitar a criação automática de campos de timestamp pelo Sequelize.
 * @config {String} tableName - Nome da tabela no banco de dados mapeada para este modelo.
 */
const Usuario = sequelize.define('Usuario', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Garante que o Sequelize entenda que esta coluna é auto-incrementável
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    atualizado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'Usuarios' // Certifique-se de que o nome da tabela está correto
});

module.exports = Usuario;