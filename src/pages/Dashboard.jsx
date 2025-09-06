import { useInventoryStore } from &quot;../store/inventoryStore&quot;;

export default function Dashboard() {
  const { products, movements } = useInventoryStore();
  const totalItems = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStock = products.filter(p => (p.stock || 0) <= (p.minStock || 0));

  return (
    <div className=&quot;grid gap-4 md:grid-cols-3&quot;>
      <div className=&quot;card&quot;>
        <h2 className=&quot;font-semibold&quot;>Produtos</h2>
        <p className=&quot;text-3xl mt-2&quot;>{products.length}</p>
      </div>
      <div className=&quot;card&quot;>
        <h2 className=&quot;font-semibold&quot;>Itens em estoque</h2>
        <p className=&quot;text-3xl mt-2&quot;>{totalItems}</p>
      </div>
      <div className=&quot;card&quot;>
        <h2 className=&quot;font-semibold&quot;>Alertas de baixo estoque</h2>
        <p className=&quot;text-3xl mt-2&quot;>{lowStock.length}</p>
      </div>

      <div className=&quot;md:col-span-3 card&quot;>
        <h3 className=&quot;font-semibold mb-2&quot;>Boas práticas para reduzir perdas</h3>
        <ul className=&quot;list-disc pl-5 text-sm text-slate-700 space-y-1&quot;>
          <li>Cadastre o estoque mínimo por produto para alertas imediatos.</li>
          <li>Registre todas as entradas/saídas como movimentos com justificativa.</li>
          <li>Faça inventários cíclicos semanais por categoria.</li>
          <li>Use código de barras para evitar digitação incorreta.</li>
        </ul>
      </div>
    </div>
  );
}
