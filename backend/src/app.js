/**
 * Arquivo principal do servidor Express para a aplicação.
 * Este arquivo configura o servidor, define rotas e gerencia a conexão com o banco de dados.
 * @module app
 */

const sequelize = require('./config/database'); // Importa a configuração do Sequelize
const express = require('express');
const app = express();

/**
 * Middleware para parsear JSON no corpo das requisições.
 */
app.use(express.json());

/**
 * Importa e configura as rotas principais da API.
 */
const routes = require('./routes'); // Assegure-se de que o caminho para o arquivo de rotas está correto
app.use('/api', routes); // Prefixo '/api' para todas as rotas definidas em 'routes'

/**
 * Rota raiz que retorna uma mensagem simples para verificar se o servidor está operacional.
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Teste e conexão inicial com o banco de dados usando Sequelize.
 * Autentica a conexão com o banco de dados e sincroniza os modelos com as tabelas, sem forçar a recriação das tabelas.
 */
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        sequelize.sync({ force: false }) // Ajuste 'force: true' para recriar as tabelas, se necessário
            .then(() => {
                console.log('Banco de dados conectado e sincronizado');
                // Inicia o servidor após a conexão e sincronização bem-sucedidas
                const PORT = process.env.PORT || 3000;
                app.listen(PORT, () => {
                    console.log(`Servidor rodando na porta ${PORT}`);
                });
            })
            .catch((syncError) => {
                console.error('Erro ao sincronizar com o banco de dados:', syncError);
            });
    })
    .catch((authError) => {
        console.error('Erro ao conectar com o banco de dados:', authError);
    });
