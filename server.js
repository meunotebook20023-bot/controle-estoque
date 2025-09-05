const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const ExcelJS = require('exceljs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, 'public/uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Produtos em memória
let produtos = [];

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/add', upload.single('imagem'), (req, res) => {
    const { nome, codigo_interno, categoria, localizacao, quantidade, validade } = req.body;
    const imagem = req.file ? `/public/uploads/${req.file.filename}` : '';

    produtos.push({
        nome,
        codigo_interno,
        categoria,
        localizacao,
        quantidade: parseInt(quantidade),
        validade,
        imagem
    });
    res.status(200).send('Produto adicionado com sucesso');
});

app.get('/export', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Estoque');

    sheet.columns = [
        { header: 'Nome', key: 'nome', width: 25 },
        { header: 'Código Interno', key: 'codigo_interno', width: 20 },
        { header: 'Categoria', key: 'categoria', width: 15 },
        { header: 'Localização', key: 'localizacao', width: 15 },
        { header: 'Quantidade', key: 'quantidade', width: 10 },
        { header: 'Validade', key: 'validade', width: 15 },
        { header: 'Imagem', key: 'imagem', width: 30 }
    ];

    produtos.forEach(p => {
        sheet.addRow({
            nome: p.nome,
            codigo_interno: p.codigo_interno,
            categoria: p.categoria,
            localizacao: p.localizacao,
            quantidade: p.quantidade,
            validade: p.validade,
            imagem: p.imagem
        });
    });

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=estoque.xlsx');

    await workbook.xlsx.write(res);
    res.end();
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
