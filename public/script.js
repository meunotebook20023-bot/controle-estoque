const form = document.getElementById('formProduto');
const tabela = document.querySelector('#tabelaProdutos tbody');
const exportBtn = document.getElementById('exportBtn');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    form.reset();
    carregarProdutos();
});

exportBtn.addEventListener('click', () => {
    window.location.href = '/export';
});

async function carregarProdutos() {
    const res = await fetch('/produtos');
    const produtos = await res.json();

    tabela.innerHTML = '';
    const hoje = new Date();

    produtos.forEach(p => {
        const tr = document.createElement('tr');
        const validade = new Date(p.validade);
        const diffDias = Math.floor((validade - hoje)/(1000*60*60*24));

        if(diffDias < 0){
            tr.style.backgroundColor = '#f87171'; // vermelho vencido
        } else if(diffDias <= 20){
            tr.style.backgroundColor = '#facc15'; // amarelo alerta
        }

        tr.innerHTML = `
            <td>${p.codigo_barras}</td>
            <td>${p.nome}</td>
            <td>${p.codigo_interno}</td>
            <td>${p.quantidade}</td>
            <td>${p.validade}</td>
        `;
        tabela.appendChild(tr);
    });
}

carregarProdutos();
