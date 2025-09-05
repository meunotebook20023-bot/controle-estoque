const form = document.getElementById('formProduto');
const tabela = document.querySelector('#tabelaProdutos tbody');
const exportBtn = document.getElementById('exportBtn');

async function carregarProdutos() {
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
        const diffDias = Math.floor((validade - hoje)/(1000*60*60*24));

        if(diffDias < 0){
            tr.classList.add('vencido');
            vencido++;
        } else if(diffDias <= 20){
            tr.classList.add('proximo');
            proximo++;
        }
        if(p.quantidade <= 5){
            tr.classList.add('estoqueBaixo');
        }

        tr.innerHTML = `
            <td><img src="${p.imagem}" alt="${p.nome}"></td>
            <td>${p.nome}</td>
            <td>${p.codigo_interno}</td>
            <td>${p.categoria || ''}</td>
            <td>${p.localizacao || ''}</td>
            <td>${p.quantidade}</td>
            <td>${p.validade}</td>
        `;
        tabela.appendChild(tr);
    });

    document.getElementById('totalProdutos').innerText = total;
    document.getElementById('proximoVencer').innerText = proximo;
    document.getElementById('vencidos').innerText = vencido;

    // Gráfico
    const ctx = document.getElementById('graficoVencimento').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Próximo de Vencer', 'Vencidos', 'Estoque Baixo'],
            datasets: [{
                label: 'Produtos',
                data: [proximo, vencido, produtos.filter(p=>p.quantidade<=5).length],
                backgroundColor: ['#facc15','#f87171','#fb923c']
            }]
        },
        options: { responsive: true }
    });
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);

    await fetch('/add', {
        method: 'POST',
        body: formData
    });

    form.reset();
    carregarProdutos();
});

exportBtn.addEventListener('click', () => {
    window.location.href = '/export';
});

carregarProdutos();
