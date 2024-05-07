const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transacao = sequelize.define('Transacao', {
    transacao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', // Assegure-se que este é o nome correto da tabela no seu banco de dados
            key: 'usuario_id'
        }
    },
    tipo: {
        type: DataTypes.ENUM('receita', 'despesa'),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true // Permitir nulo, já que VARCHAR(255) pode ser opcional
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Ajuste conforme a obrigação da chave no seu schema
        references: {
            model: 'Categorias', // Assegure-se que este é o nome correto da tabela no seu banco de dados
            key: 'categoria_id'
        }
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
    tableName: 'Transacoes',
    timestamps: false
});

module.exports = Transacao;
