import { useState } from &quot;react&quot;;
import ExportButtons from &quot;../../components/ExportButtons&quot;;

export default function CommissionReport() {
  const [form, setForm] = useState({
    loja: &quot;Matriz&quot;,
    tipo: &quot;Todos&quot;,
    dataInicial: &quot;&quot;,
    dataFinal: &quot;&quot;,
    prazoEntrega: &quot;&quot;,
    cliente: &quot;&quot;,
    vendedor: &quot;Todos&quot;,
    situacao: &quot;Todos&quot;,
    centroCusto: &quot;Todos&quot;,
    considerarFrete: &quot;Sim&quot;,
    considerarDevolucao: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === &quot;checkbox&quot; ? checked : value });
  };

  const gerar = () => {
    // Aqui você conectaria na API/serviço e traria o relatório
    alert(&quot;Relatório gerado! (ajuste a integração no service)&quot;);
  };

  const limpar = () => {
    setForm({
      loja: &quot;Matriz&quot;,
      tipo: &quot;Todos&quot;,
      dataInicial: &quot;&quot;,
      dataFinal: &quot;&quot;,
      prazoEntrega: &quot;&quot;,
      cliente: &quot;&quot;,
      vendedor: &quot;Todos&quot;,
      situacao: &quot;Todos&quot;,
      centroCusto: &quot;Todos&quot;,
      considerarFrete: &quot;Sim&quot;,
      considerarDevolucao: false,
    });
  };

  const mock = [
    { venda: &quot;0001&quot;, vendedor: &quot;João&quot;, cliente: &quot;ACME&quot;, valor: 1200.5, comissao: 120.05, data: &quot;2025-09-01&quot; },
    { venda: &quot;0002&quot;, vendedor: &quot;Maria&quot;, cliente: &quot;Beta&quot;, valor: 800.0, comissao: 80, data: &quot;2025-09-02&quot; },
  ];

  return (
    <div className=&quot;space-y-4&quot;>
      <h2 className=&quot;font-semibold text-lg&quot;>📊 Relatório de comissão por venda</h2>
      <div className=&quot;grid grid-cols-1 md:grid-cols-3 gap-4 card&quot;>
        <div>
          <label className=&quot;label&quot;>Loja</label>
          <select name=&quot;loja&quot; className=&quot;select&quot; value={form.loja} onChange={handleChange}>
            <option>Matriz</option><option>Filial</option>
          </select>
        </div>
        <div>
          <label className=&quot;label&quot;>Tipo</label>
          <select name=&quot;tipo&quot; className=&quot;select&quot; value={form.tipo} onChange={handleChange}>
            <option>Todos</option><option>À vista</option><option>A prazo</option>
          </select>
        </div>
        <div>
          <label className=&quot;label&quot;>Data da venda (início)</label>
          <input type=&quot;date&quot; name=&quot;dataInicial&quot; className=&quot;input&quot; value={form.dataInicial} onChange={handleChange} />
        </div>
        <div>
          <label className=&quot;label&quot;>Data da venda (fim)</label>
          <input type=&quot;date&quot; name=&quot;dataFinal&quot; className=&quot;input&quot; value={form.dataFinal} onChange={handleChange} />
        </div>
        <div>
          <label className=&quot;label&quot;>Prazo de entrega</label>
          <input type=&quot;date&quot; name=&quot;prazoEntrega&quot; className=&quot;input&quot; value={form.prazoEntrega} onChange={handleChange} />
        </div>
        <div>
          <label className=&quot;label&quot;>Cliente</label>
          <input name=&quot;cliente&quot; className=&quot;input&quot; value={form.cliente} onChange={handleChange} placeholder=&quot;Digite para buscar&quot; />
        </div>
        <div>
          <label className=&quot;label&quot;>Vendedor</label>
          <select name=&quot;vendedor&quot; className=&quot;select&quot; value={form.vendedor} onChange={handleChange}>
            <option>Todos</option><option>João</option><option>Maria</option>
          </select>
        </div>
        <div>
          <label className=&quot;label&quot;>Situação</label>
          <select name=&quot;situacao&quot; className=&quot;select&quot; value={form.situacao} onChange={handleChange}>
            <option>Todos</option><option>Pago</option><option>Pendente</option><option>Cancelado</option>
          </select>
        </div>
        <div>
          <label className=&quot;label&quot;>Centro de Custo</label>
          <select name=&quot;centroCusto&quot; className=&quot;select&quot; value={form.centroCusto} onChange={handleChange}>
            <option>Todos</option><option>Administrativo</option><option>Operacional</option>
          </select>
        </div>
        <div>
          <label className=&quot;label&quot;>Considerar frete</label>
          <select name=&quot;considerarFrete&quot; className=&quot;select&quot; value={form.considerarFrete} onChange={handleChange}>
            <option>Sim</option><option>Não</option>
          </select>
        </div>
        <div className=&quot;flex items-center gap-2 mt-6&quot;>
          <input type=&quot;checkbox&quot; name=&quot;considerarDevolucao&quot; checked={form.considerarDevolucao} onChange={handleChange} />
          <label>Considerar devoluções</label>
        </div>
      </div>
      <div className=&quot;flex gap-2&quot;>
        <button className=&quot;btn btn-success&quot; onClick={gerar}>Gerar</button>
        <button className=&quot;btn btn-danger&quot; onClick={limpar}>Limpar</button>
      </div>
      <div className=&quot;card&quot;>
        <div className=&quot;flex items-center justify-between&quot;>
          <h3 className=&quot;font-semibold&quot;>Resultados (mock)</h3>
        </div>
        <div className=&quot;mt-2 overflow-x-auto&quot;>
          <table className=&quot;min-w-full text-sm&quot;>
            <thead>
              <tr className=&quot;text-left text-slate-500&quot;>
                <th className=&quot;py-2 px-3&quot;>Venda</th>
                <th className=&quot;py-2 px-3&quot;>Vendedor</th>
                <th className=&quot;py-2 px-3&quot;>Cliente</th>
                <th className=&quot;py-2 px-3&quot;>Valor</th>
                <th className=&quot;py-2 px-3&quot;>Comissão</th>
                <th className=&quot;py-2 px-3&quot;>Data</th>
              </tr>
            </thead>
            <tbody>
              {mock.map((r) => (
                <tr key={r.venda} className=&quot;border-t&quot;>
                  <td className=&quot;py-2 px-3&quot;>{r.venda}</td>
                  <td className=&quot;py-2 px-3&quot;>{r.vendedor}</td>
                  <td className=&quot;py-2 px-3&quot;>{r.cliente}</td>
                  <td className=&quot;py-2 px-3&quot;>R$ {r.valor.toFixed(2)}</td>
                  <td className=&quot;py-2 px-3&quot;>R$ {r.comissao.toFixed(2)}</td>
                  <td className=&quot;py-2 px-3&quot;>{r.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
