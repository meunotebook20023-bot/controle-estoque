const form = document.getElementById('formProduto');
const tabela = document.querySelector('#tabelaProdutos tbody');
const exportBtn = document.getElementById('exportBtn');
const inputImagem = document.getElementById('inputImagem');
const previewImagem = document.getElementById('previewImagem');
const filtroCategoria = document.getElementById('filtroCategoria');
const buscaProduto = document.getElementById('buscaProduto');

let grafico, graficoLinhaTempo;

// Preview da imagem
inputImagem.addEventListener('change', () => {
    const file = inputImagem.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = e => {
            previewImagem.src = e.target.result;
            previewImagem.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        previewImagem.src = '';
        previewImagem.classList.add('hidden');
    }
});

// Carregar produtos
async function carregarProdutos() {
    const res = await fetch('/produtos');
    const produtos = await res.json();
    tabela.innerHTML = '';
    filtroCategoria.innerHTML = '<option value="">Todas</option>';

    let total=0, proximo=0, vencido=0, estoqueBaixo=0;
    const hoje = new Date();
    const categorias = new Set();
    const produtosPorMes = Array(12).fill(0);

    produtos.forEach(p=>{
        total++;
        categorias.add(p.categoria || '');
        const tr=document.createElement('tr');
        const validade = new Date(p.validade);
        const diffDias = Math.floor((validade-hoje)/(1000*60*60*24));
        if(diffDias >=0) produtosPorMes[validade.getMonth()]++;

        let tooltip='';
        if(diffDias<0){tr.classList.add('vencido'); tooltip='Produto vencido!'; vencido++;}
        else if(diffDias<=20){tr.classList.add('proximo'); tooltip=`Vence em ${diffDias} dias`; proximo++;}
        if(p.quantidade<5){tr.classList.add('estoqueBaixo'); tooltip+=' Estoque baixo'; estoqueBaixo++;}

        tr.innerHTML=`
            <td><img src="${p.imagem}" alt="Imagem"></td>
            <td>${p.nome}</td>
            <td>${p.codigo_interno}</td>
            <td>${p.categoria}</td>
            <td>${p.localizacao}</td>
            <td>${p.quantidade}</td>
            <td>${p.validade}</td>
        `;
        tr.title=tooltip;
        tabela.appendChild(tr);
    });

    // Atualizar dashboard
    document.getElementById('totalProdutos').textContent = total;
    document.getElementById('proximoVencer').textContent = proximo;
    document.getElementById('vencidos').textContent = vencido;

    // Atualizar categorias
    categorias.forEach(cat=>{
        if(cat) filtroCategoria.innerHTML+=`<option value="${cat}">${cat}</option>`;
    });

    atualizarGraficos(proximo,vencido,estoqueBaixo,produtosPorMes);
}

// Adicionar produto
form.addEventListener('submit', async e=>{
    e.preventDefault();
    const formData = new FormData(form);
    await fetch('/add',{method:'POST',body:formData});
    form.reset();
    previewImagem.src=''; previewImagem.classList.add('hidden');
    carregarProdutos();
});

// Exportar Excel
exportBtn.addEventListener('click',()=> window.location.href='/export');

// Filtro categoria
filtroCategoria.addEventListener('change',()=> {
    const cat = filtroCategoria.value.toLowerCase();
    Array.from(tabela.querySelectorAll('tr')).forEach(tr=>{
        tr.style.display = (cat && !tr.children[3].textContent.toLowerCase().includes(cat)) ? 'none':'table-row';
    });
});

// Busca rápida
buscaProduto.addEventListener('input', ()=>{
    const term = buscaProduto.value.toLowerCase();
    Array.from(tabela.querySelectorAll('tr')).forEach(tr=>{
        tr.style.display = [...tr.children].some(td=>td.textContent.toLowerCase().includes(term)) ? 'table-row':'none';
    });
});

// Gráficos
function atualizarGraficos(proximo,vencido,estoqueBaixo,produtosPorMes){
    const ctx=document.getElementById('graficoVencimento').getContext('2d');
    if(grafico) grafico.destroy();
    grafico = new Chart(ctx,{
        type:'doughnut',
        data:{
            labels:['Próximo de Vencer','Vencidos','Estoque Baixo'],
            datasets:[{data:[proximo,vencido,estoqueBaixo],backgroundColor:['#facc15','#f87171','#fb923c'] }]
        },
        options:{responsive:true,plugins:{legend:{position:'bottom'}}}
    });

    const ctx2=document.getElementById('graficoLinhaTempo').getContext('2d');
    if(graficoLinhaTempo) graficoLinhaTempo.destroy();
    graficoLinhaTempo = new Chart(ctx2,{
        type:'line',
        data:{
            labels:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            datasets:[{
                label:'Produtos por mês',
                data:produtosPorMes,
                fill:true,
                backgroundColor:'rgba(59,130,246,0.2)',
                borderColor:'rgba(59,130,246,1)',
                tension:0.3,
                pointBackgroundColor:'rgba(59,130,246,1)',
                pointRadius:6,
                pointHoverRadius:8
            }]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,stepSize:1}}}
    });
}

// Inicializar
carregarProdutos();
