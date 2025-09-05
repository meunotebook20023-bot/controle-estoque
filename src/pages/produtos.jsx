import { useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [novo, setNovo] = useState({ nome: "", codigo: "", validade: "", quantidade: "", imagem: "" });

  const adicionarProduto = () => {
    if (!novo.nome || !novo.codigo) return alert("Preencha todos os campos obrigatórios!");
    setProdutos([...produtos, novo]);
    setNovo({ nome: "", codigo: "", validade: "", quantidade: "", imagem: "" });
  };

  // Função para verificar validade e aplicar cores
  const getCorValidade = (dataValidade) => {
    if (!dataValidade) return "bg-white";
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diff = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

    if (diff <= 0) return "bg-red-200"; // vencido
    if (diff <= 20) return "bg-yellow-200"; // próximo do vencimento
    return "bg-green-100"; // válido
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📋 Cadastro de Produtos</h2>

      {/* Formulário */}
      <div className="grid gap-2 mb-4 max-w-md">
        <input placeholder="Nome" className="border p-2 rounded" value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })} />
        <input placeholder="Código" className="border p-2 rounded" value={novo.codigo} onChange={(e) => setNovo({ ...novo, codigo: e.target.value })} />
        <input type="date" className="border p-2 rounded" value={novo.validade} onChange={(e) => setNovo({ ...novo, validade: e.target.value })} />
        <input type="number" placeholder="Quantidade" className="border p-2 rounded" value={novo.quantidade} onChange={(e) => setNovo({ ...novo, quantidade: e.target.value })} />
        <input type="text" placeholder="URL da imagem" className="border p-2 rounded" value={novo.imagem} onChange={(e) => setNovo({ ...novo, imagem: e.target.value })} />
        <button onClick={adicionarProduto} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Adicionar</button>
      </div>

      {/* Lista */}
      <div className="grid gap-4">
        {produtos.map((p, i) => (
          <div key={i} className={`p-4 border rounded flex items-center gap-4 shadow ${getCorValidade(p.validade)}`}>
            <img src={p.imagem || "https://via.placeholder.com/80"} alt={p.nome} className="w-20 h-20 object-cover rounded" />
            <div>
              <h3 className="font-bold">{p.nome}</h3>
              <p>📌 Código: {p.codigo}</p>
              <p>📅 Validade: {p.validade}</p>
              <p>📦 Quantidade: {p.quantidade}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
