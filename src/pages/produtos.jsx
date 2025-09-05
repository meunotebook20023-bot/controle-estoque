import React, { useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const adicionarProduto = () => {
    if (!nome || !quantidade) return;
    setProdutos([...produtos, { nome, quantidade }]);
    setNome("");
    setQuantidade("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📦 Produtos</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={adicionarProduto}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {produtos.map((produto, index) => (
          <li key={index} className="border p-2 rounded flex justify-between">
            <span>{produto.nome}</span>
            <span>Qtd: {produto.quantidade}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
