import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import * as XLSX from "xlsx";

function Relatorio() {
  const [produtos, setProdutos] = useState([]);

  // Carrega os dados do Excel gerado
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await fetch("/produtos.xlsx");
        const blob = await response.blob();
        const data = await blob.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        setProdutos(json);
      } catch (err) {
        console.warn("Ainda não há planilha de produtos gerada.");
      }
    };

    carregarProdutos();
  }, []);

  // Dados para gráfico de estoque
  const estoqueData = produtos.map((p) => ({
    nome: p.Nome,
    quantidade: Math.floor(Math.random() * 100) + 1, // simulação
  }));

  // Dados para gráfico de validade
  const hoje = new Date();
  const validadeData = produtos.map((p) => {
    const validade = p.Validade ? new Date(p.Validade) : null;
    let status = "Sem validade";

    if (validade) {
      const diff = (validade - hoje) / (1000 * 60 * 60 * 24);
      if (diff <= 0) status = "Vencido";
      else if (diff <= 30) status = "Próximo do vencimento";
      else status = "Dentro do prazo";
    }

    return { nome: p.Nome, status };
  });

  // Contagem por status
  const validadeCount = validadeData.reduce((acc, cur) => {
    acc[cur.status] = (acc[cur.status] || 0) + 1;
    return acc;
  }, {});

  const validadeChart = Object.entries(validadeCount).map(([status, quantidade]) => ({
    status,
    quantidade,
  }));

  const COLORS = ["#e74c3c", "#f1c40f", "#2ecc71", "#95a5a6"];

  return (
    <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">📊 Relatórios</h2>

      {/* Gráfico de estoque */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Estoque por Produto</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={estoqueData}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de validade */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Situação de Validade</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={validadeChart}
              dataKey="quantidade"
              nameKey="status"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {validadeChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Relatorio;
