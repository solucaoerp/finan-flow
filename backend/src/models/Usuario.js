const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment-timezone');

// Configurar o fuso horário local
const TIMEZONE = 'America/Sao_Paulo';

// Define o modelo 'Usuario'
const Usuario = sequelize.define('Usuario', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    tableName: 'Usuarios',
    hooks: {
        // Usa `moment.tz` para definir `atualizado_em` no fuso horário local
        beforeUpdate: (usuario) => {
            usuario.atualizado_em = moment().tz(TIMEZONE).format('YYYY-MM-DD HH:mm:ss.SSS');
        }
    }
});

module.exports = Usuario;