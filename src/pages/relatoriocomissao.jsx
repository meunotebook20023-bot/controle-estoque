import { useState } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

export default function RelatorioComissao() {
  const [vendas, setVendas] = useState([
    { vendedor: "João", valor: 1500, comissao: 0.1 },
    { vendedor: "Maria", valor: 2500, comissao: 0.12 },
    { vendedor: "Carlos", valor: 1800, comissao: 0.08 },
  ]);

  // Calcular comissão de cada venda
  const calcularComissao = (valor, taxa) => (valor * taxa).toFixed(2);

  // Exportar relatório em PDF
  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Comissão", 14, 20);

    doc.setFontSize(12);
    vendas.forEach((venda, i) => {
      doc.text(
        `${venda.vendedor} - Venda: R$${venda.valor} | Comissão: R$${calcularComissao(venda.valor, venda.comissao)}`,
        14,
        40 + i * 10
      );
    });

    doc.save("relatorio-comissao.pdf");
  };

  // Exportar relatório em Excel
  const gerarExcel = () => {
    const dados = vendas.map((venda) => ({
      Vendedor: venda.vendedor,
      "Valor da Venda (R$)": venda.valor,
      "Taxa de Comissão (%)": (venda.comissao * 100).toFixed(2),
      "Comissão (R$)": calcularComissao(venda.valor, venda.comissao),
    }));

    const planilha = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, planilha, "Relatório");
    XLSX.writeFile(wb, "relatorio-comissao.xlsx");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        📊 Relatório de Comissão
      </h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Vendedor</th>
            <th className="p-3 text-left">Valor da Venda (R$)</th>
            <th className="p-3 text-left">Taxa de Comissão (%)</th>
            <th className="p-3 text-left">Comissão (R$)</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
            >
              <td className="p-3">{venda.vendedor}</td>
              <td className="p-3">R${venda.valor}</td>
              <td className="p-3">{(venda.comissao * 100).toFixed(2)}%</td>
              <td className="p-3">
                R${calcularComissao(venda.valor, venda.comissao)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-6">
        <button
          onClick={gerarPDF}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          📄 Exportar PDF
        </button>

        <button
          onClick={gerarExcel}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          📊 Exportar Excel
        </button>
      </div>
    </div>
  );
}
