import { useState } from &quot;react&quot;;
import { useInventoryStore } from &quot;../store/inventoryStore&quot;;

export default function Movements() {
  const { products, addMovement, updateProduct } = useInventoryStore();
  const [form, setForm] = useState({ productId: &quot;&quot;, type: &quot;in&quot;, qty: 1, date: new Date().toISOString().slice(0,10), note: &quot;&quot; });

  const onSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === form.productId);
    if (!product) return;
    const qty = Number(form.qty);
    const newStock = form.type === &quot;in&quot; ? (product.stock || 0) + qty : (product.stock || 0) - qty;
    updateProduct(product.id, { stock: newStock });
    addMovement({ ...form, qty, id: crypto.randomUUID() });
    setForm({ productId: &quot;&quot;, type: &quot;in&quot;, qty: 1, date: new Date().toISOString().slice(0,10), note: &quot;&quot; });
  };

  return (
    <div className=&quot;grid gap-4 md:grid-cols-2&quot;>
      <div className=&quot;card&quot;>
        <h2 className=&quot;font-semibold mb-3&quot;>Registrar movimento</h2>
        <form onSubmit={onSubmit} className=&quot;space-y-3&quot;>
          <div>
            <label className=&quot;label&quot;>Produto</label>
            <select className=&quot;select&quot; value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})} required>
              <option value=&quot;&quot;>Selecione</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} — {p.sku}</option>)}
            </select>
          </div>
          <div className=&quot;grid grid-cols-3 gap-2&quot;>
            <div>
              <label className=&quot;label&quot;>Tipo</label>
              <select className=&quot;select&quot; value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
                <option value=&quot;in&quot;>Entrada</option>
                <option value=&quot;out&quot;>Saída</option>
              </select>
            </div>
            <div>
              <label className=&quot;label&quot;>Quantidade</label>
              <input type=&quot;number&quot; className=&quot;input&quot; value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})} min=&quot;1&quot; />
            </div>
            <div>
              <label className=&quot;label&quot;>Data</label>
              <input type=&quot;date&quot; className=&quot;input&quot; value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
            </div>
          </div>
          <div>
            <label className=&quot;label&quot;>Observação</label>
            <input className=&quot;input&quot; value={form.note} onChange={e=>setForm({...form, note:e.target.value})} />
          </div>
          <button className=&quot;btn btn-primary&quot; type=&quot;submit&quot;>Salvar movimento</button>
        </form>
      </div>
      <div className=&quot;card&quot;>
        <h2 className=&quot;font-semibold mb-3&quot;>Dicas para precisão</h2>
        <ul className=&quot;list-disc pl-5 text-sm text-slate-700 space-y-1&quot;>
          <li>Registre quebras e perdas como &quot;saída&quot; com observação.</li>
          <li>Conferir código/SKU antes de lançar.</li>
          <li>Auditar diferenças toda sexta-feira.</li>
        </ul>
      </div>
    </div>
  );
}
