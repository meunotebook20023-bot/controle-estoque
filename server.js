const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(express.static('public'));

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_barras TEXT,
    nome TEXT,
    codigo_interno TEXT,
    quantidade INTEGER,
    validade TEXT
)`);

// Inserir produto
app.post('/add', (req, res) => {
    const { codigo_barras, nome, codigo_interno, quantidade, validade } = req.body;
    db.run(`INSERT INTO produtos (codigo_barras, nome, codigo_interno, quantidade, validade)
            VALUES (?, ?, ?, ?, ?)`,
        [codigo_barras, nome, codigo_interno, quantidade, validade],
        function(err){
            if(err) return res.status(500).send(err.message);
            res.send({ id: this.lastID });
        });
});

// Obter produtos
app.get('/produtos', (req, res) => {
    db.all(`SELECT * FROM produtos`, [], (err, rows) => {
        if(err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

// Exportar Excel
app.get('/export', (req, res) => {
    db.all(`SELECT * FROM produtos`, [], (err, rows) => {
        if(err) return res.status(500).send(err.message);

        const data = rows.map(r => ({
            "Código de Barras": r.codigo_barras,
            "Nome": r.nome,
            "Código Interno": r.codigo_interno,
            "Quantidade": r.quantidade,
            "Validade": r.validade
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Estoque');

        const filePath = './public/estoque.xlsx';
        XLSX.writeFile(wb, filePath);
        res.download(filePath);
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
