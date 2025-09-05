const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const XLSX = require('xlsx');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

const upload = multer({ dest: 'public/uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_barras TEXT,
    nome TEXT,
    codigo_interno TEXT,
    quantidade INTEGER,
    validade TEXT,
    categoria TEXT,
    localizacao TEXT,
    imagem TEXT
)`);

// Adicionar produto
app.post('/add', upload.single('imagem'), (req, res) => {
    const { codigo_barras, nome, codigo_interno, quantidade, validade, categoria, localizacao } = req.body;
    let imagem = req.file ? '/uploads/' + req.file.filename : '';

    // Se não enviar imagem, buscar automaticamente via Unsplash
    if(!imagem){
        imagem = `https://source.unsplash.com/160x160/?${encodeURIComponent(nome)}`;
    }

    db.run(`INSERT INTO produtos (codigo_barras, nome, codigo_interno, quantidade, validade, categoria, localizacao, imagem)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [codigo_barras, nome, codigo_interno, quantidade, validade, categoria, localizacao, imagem],
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

// Exportar para Excel
app.get('/export', (req, res) => {
    db.all(`SELECT * FROM produtos`, [], (err, rows) => {
        if(err) return res.status(500).send(err.message);

        const data = rows.map(r => ({
            "Código de Barras": r.codigo_barras,
            "Nome": r.nome,
            "Código Interno": r.codigo_interno,
            "Categoria": r.categoria,
            "Localização": r.localizacao,
            "Quantidade": r.quantidade,
            "Validade": r.validade
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Estoque');

        const filePath = path.join(__dirname, 'public/estoque.xlsx');
        XLSX.writeFile(wb, filePath);
        res.download(filePath);
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
