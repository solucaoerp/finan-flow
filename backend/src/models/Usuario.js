const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    tableName: 'Usuarios'
});

module.exports = Usuario;
