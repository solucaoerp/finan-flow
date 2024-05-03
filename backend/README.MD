# FinanFlow

FinanFlow é uma aplicação para gerenciamento financeiro, dividida em backend e frontend, que permite aos usuários gerenciar transações financeiras e categorias.

## Estrutura do Projeto

O projeto está organizado da seguinte maneira:

```
FinanFlow/
│
├── database/
│   └── database.db
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── UsuarioController.js
│   │   ├── models/
│   │   │   └── Usuario.js
│   │   ├── routes/
│   │   │   └── usuarioRoutes.js
│   │   └── app.js
│   ├── package.json
│   └── .env
│
└── frontend/
    └── [todos os arquivos do frontend]
```

## Configuração e Instalação

### Requisitos
- Node.js
- Sequelize CLI
- SQLite3

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositório>
   cd FinanFlow
   ```

2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Backend

### Conexão com o Banco de Dados

O arquivo `database.js` na pasta `config` configura o Sequelize para conectar-se ao SQLite. O caminho do arquivo do banco de dados é relativo ao diretório do projeto.

```javascript
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../database/database.db'),
    logging: false // console.log babilita logs SQL para depuração
});

module.exports = sequelize;
```

### Modelos

O modelo `Usuario` é definido em `Usuario.js` na pasta `models`. Este modelo representa os usuários na base de dados.

```javascript
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
```

### Controladores

O `UsuarioController` gerencia a lógica para operações relacionadas aos usuários, como listar todos os usuários.

```javascript
const Usuario = require('../models/Usuario');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter os usuários' });
    }
};
```

### Rotas

As rotas relacionadas aos usuários são definidas em `usuarioRoutes.js`.

```javascript
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

router.get('/usuarios', usuarioController.listarUsuarios);

module.exports = router;
```

## Frontend

O frontend está localizado na pasta `frontend` e inclui todos os arquivos necessários para a interface do usuário da aplicação.

## Licença

Este projeto está licenciado sob a Licença MIT.
```

Este README fornece uma visão geral clara do projeto, sua estrutura, configuração e como os componentes são organizados e interagem. Isso facilitará para novos desenvolvedores entenderem e começarem a trabalhar no projeto. Se precisar de ajustes adicionais ou detalhamento em áreas específicas, estou aqui para ajudar!