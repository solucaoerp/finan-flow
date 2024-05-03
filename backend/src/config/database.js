/**
 * Módulo para configuração do Sequelize, o ORM utilizado para interação com o banco de dados SQLite.
 * @module sequelizeConfig
 */

const { Sequelize } = require('sequelize');
const path = require('path');

/**
 * Instância do Sequelize configurada para conectar-se a um banco de dados SQLite.
 * 
 * Configurações da instância:
 * @param {String} dialect - Especifica o dialeto do banco de dados usado, neste caso, 'sqlite'.
 * @param {String} storage - Caminho relativo para o arquivo do banco de dados SQLite. 
 *                           Ajuste conforme a estrutura de pastas do projeto.
 * @param {Function|Boolean} logging - Configura o logging. Pode ser definido para `console.log` para ativar
 *                                     a exibição de logs SQL no console, ou `false` para desativar.
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../database/database.db'),
    logging: false
});

module.exports = sequelize;