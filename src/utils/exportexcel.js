import * as XLSX from "xlsx";

export default function exportExcel(dados) {
  if (!dados.length) {
    alert("Nenhum dado para exportar!");
    return;
  }

  const planilha = dados.map(v => ({
    Vendedor: v.vendedor,
    Produto: v.produto,
    Valor: v.valor,
    "Comissão (%)": v.comissao,
    "Comissão (R$)": (v.valor * (v.comissao / 100)).toFixed(2)
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(planilha);
  XLSX.utils.book_append_sheet(wb, ws, "Comissão");

  XLSX.writeFile(wb, "relatorio_comissao.xlsx");
}
