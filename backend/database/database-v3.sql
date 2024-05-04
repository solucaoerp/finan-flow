--
-- Arquivo gerado com SQLiteStudio v3.4.4 em sáb mai 4 11:52:06 2024
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
INSERT INTO Categorias (categoria_id, nome, tipo, criado_em, atualizado_em) VALUES (1, 'Salário', 'receita', '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Categorias (categoria_id, nome, tipo, criado_em, atualizado_em) VALUES (2, 'Projeto Freelance', 'receita', '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Categorias (categoria_id, nome, tipo, criado_em, atualizado_em) VALUES (3, 'Aluguel', 'despesa', '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Categorias (categoria_id, nome, tipo, criado_em, atualizado_em) VALUES (4, 'Compras', 'despesa', '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Categorias (categoria_id, nome, tipo, criado_em, atualizado_em) VALUES (5, 'Transporte', 'despesa', '2024-05-02 15:52:38', '2024-05-02 15:52:38');

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
INSERT INTO Transacoes (transacao_id, usuario_id, tipo, valor, descricao, data, categoria_id, criado_em, atualizado_em) VALUES (1, 1, 'receita', 5000, 'Salário Mensal', '2024-05-01', 1, '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Transacoes (transacao_id, usuario_id, tipo, valor, descricao, data, categoria_id, criado_em, atualizado_em) VALUES (2, 1, 'receita', 1500, 'Projeto Freelance', '2024-05-03', 2, '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Transacoes (transacao_id, usuario_id, tipo, valor, descricao, data, categoria_id, criado_em, atualizado_em) VALUES (3, 1, 'despesa', 1200, 'Aluguel de Abril', '2024-04-05', 3, '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Transacoes (transacao_id, usuario_id, tipo, valor, descricao, data, categoria_id, criado_em, atualizado_em) VALUES (4, 1, 'despesa', 300, 'Compras no Supermercado', '2024-05-06', 4, '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Transacoes (transacao_id, usuario_id, tipo, valor, descricao, data, categoria_id, criado_em, atualizado_em) VALUES (5, 2, 'despesa', 100, 'Uber para o Aeroporto', '2024-05-02', 5, '2024-05-02 15:52:38', '2024-05-02 15:52:38');

-- Tabela: Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Usuarios (usuario_id, nome, email, senha_hash, criado_em, atualizado_em) VALUES (1, 'João Silva', 'joao.silva@example.com', 'hashsenha1', '2024-05-02 15:52:38', '2024-05-02 15:52:38');
INSERT INTO Usuarios (usuario_id, nome, email, senha_hash, criado_em, atualizado_em) VALUES (2, 'Ana Costa', 'ana.costa@example.com', 'hashsenha2', '2024-05-02 15:52:38', '2024-05-02 15:52:38');

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
