const form = document.getElementById('formProduto');
const tabela = document.querySelector('#tabelaProdutos tbody');
const exportBtn = document.getElementById('exportBtn');

// Função para carregar todos os produtos do servidor
async function carregarProdutos() {
    try {
        const res = await fetch('/produtos');
        const produtos = await res.json();
        tabela.innerHTML = '';

        let total = produtos.length;
        let proximo = 0;
        let vencido = 0;

        const hoje = new Date();

        produtos.forEach(p => {
            const tr = document.createElement('tr');
            const validade = new Date(p.validade);
            const diffDias = Math.floor((validade - hoje) / (1000 * 60 * 60 * 24));

            // Classes visuais
            if (diffDias < 0) {
                tr.classList.add('vencido');
                vencido++;
            } else if (diffDias <= 20) {
                tr.classList.add('proximo');
                proximo++;
            }

            if (p.quantidade <= 5) {
                tr.classList.add('estoqueBaixo');
            }

            tr.innerHTML = `
                <td><img src="${p.imagem}" alt="${p.nome}" class="rounded"></td>
                <td>${p.nome}</td>
                <td>${p.codigo_interno}</td>
                <td>${p.categoria || '-'}</td>
                <td>${p.localizacao || '-'}</td>
                <td>${p.quantidade}</td>
                <td>${p.validade}</td>
            `;
            tabela.appendChild(tr);
        });

        // Atualizar dashboard
        document.getElementById('totalProdutos').innerText = total;
        document.getElementById('proximoVencer').innerText = proximo;
        document.getElementById('vencidos').innerText = vencido;

        // Criar gráfico
        criarGrafico(proximo, vencido, produtos.filter(p => p.quantidade <= 5).length);

    } catch (err) {
        console.error('Erro ao carregar produtos:', err);
    }
}

// Função para criar gráfico
let grafico; // variável global para atualizar o gráfico
function criarGrafico(proximo, vencido, estoqueBaixo) {
    const ctx = document.getElementById('graficoVencimento').getContext('2d');
    if (grafico) grafico.destroy(); // destrói gráfico antigo se existir
    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Próximo de Vencer', 'Vencidos', 'Estoque Baixo'],
            datasets: [{
                label: 'Quantidade de Produtos',
                data: [proximo, vencido, estoqueBaixo],
                backgroundColor: ['#facc15', '#f87171', '#fb923c']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: { beginAtZero: true, precision:0 }
            }
        }
    });
}

// Evento de submissão do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const res = await fetch('/add', {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error('Erro ao adicionar produto');

        form.reset();
        carregarProdutos();
    } catch (err) {
        console.error(err);
        alert('Não foi possível adicionar o produto.');
    }
});

// Evento para exportar Excel
exportBtn.addEventListener('click', () => {
    window.location.href = '/export';
});

// Carregar produtos ao iniciar
carregarProdutos();
