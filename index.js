const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'estoque_doacoes_zattera'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// Rotas da API
// Listar todos os produtos
app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Adicionar produto
app.post('/produtos', (req, res) => {
    const { nome, quantidade, categoria, data_entrada } = req.body;
    const sql = 'INSERT INTO produtos (nome, quantidade, categoria, data_entrada) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, quantidade, categoria, data_entrada], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...req.body });
    });
});

// Editar produto
app.put('/produtos/:id', (req, res) => {
    const { nome, quantidade, categoria, data_entrada } = req.body;
    const sql = 'UPDATE produtos SET nome = ?, quantidade = ?, categoria = ?, data_entrada = ? WHERE id = ?';
    db.query(sql, [nome, quantidade, categoria, data_entrada, req.params.id], (err) => {
        if (err) throw err;
        res.json({ id: req.params.id, ...req.body });
    });
});

// Remover produto
app.delete('/produtos/:id', (req, res) => {
    const sql = 'DELETE FROM produtos WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

app.listen(3000, () => console.log('API rodando na porta 3000'));