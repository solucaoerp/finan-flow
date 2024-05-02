--
-- Arquivo gerado com SQLiteStudio v3.4.4 em qui mai 2 12:52:23 2024
--
-- Codificação de texto usada: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabela: Categorias
CREATE TABLE IF NOT EXISTS Categorias (
    categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    tipo TEXT CHECK(tipo IN ('receita', 'despesa')) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Transacoes
CREATE TABLE IF NOT EXISTS Transacoes (
    transacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    tipo TEXT CHECK(tipo IN ('receita', 'despesa')) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    descricao VARCHAR(255),
    data DATE NOT NULL,
    categoria_id INTEGER,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id)
);

-- Tabela: Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger: atualizar_categoria_em
CREATE TRIGGER IF NOT EXISTS atualizar_categoria_em AFTER UPDATE ON Categorias
FOR EACH ROW
BEGIN
    UPDATE Categorias SET atualizado_em = CURRENT_TIMESTAMP WHERE categoria_id = old.categoria_id;
END;

-- Trigger: atualizar_transacao_em
CREATE TRIGGER IF NOT EXISTS atualizar_transacao_em AFTER UPDATE ON Transacoes
FOR EACH ROW
BEGIN
    UPDATE Transacoes SET atualizado_em = CURRENT_TIMESTAMP WHERE transacao_id = old.transacao_id;
END;

-- Trigger: atualizar_usuario_em
CREATE TRIGGER IF NOT EXISTS atualizar_usuario_em AFTER UPDATE ON Usuarios
FOR EACH ROW
BEGIN
    UPDATE Usuarios SET atualizado_em = CURRENT_TIMESTAMP WHERE usuario_id = old.usuario_id;
END;

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
