import React, { useState, useEffect } from "react";

export default function Relatorio() {
  const [produtos, setProdutos] = useState([]);

  // Buscar produtos salvos no localStorage
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(produtosSalvos);
  }, []);

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Relatório de Produtos</h2>

      {produtos.length === 0 ? (
        <p className="text-gray-600">Nenhum produto cadastrado até agora.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">Foto</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Código</th>
              <th className="p-2 border">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border text-center">
                  {produto.foto ? (
                    <img
                      src={produto.foto}
                      alt={produto.nome}
                      className="w-16 h-16 object-cover rounded-md mx-auto"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 border">{produto.nome}</td>
                <td className="p-2 border">{produto.codigo}</td>
                <td className="p-2 border text-center">{produto.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
