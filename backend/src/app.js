const express = require('express');
const sequelize = require('./config/database');

// Cria uma instância do Express
const app = express();

// Middlewares
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

app.use(usuarioRoutes);
app.use(categoriaRoutes);

// Rotas de Raiz
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Conexão com o Banco de Dados
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

// Exporta a instância do Express para ser utilizada em outros arquivos, se necessário
module.exports = app;
