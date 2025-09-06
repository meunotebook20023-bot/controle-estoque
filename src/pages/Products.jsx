import { useState } from &quot;react&quot;;
import { useInventoryStore } from &quot;../store/inventoryStore&quot;;
import Table from &quot;../components/Table&quot;;
import ExportButtons from &quot;../components/ExportButtons&quot;;

export default function Products() {
  const { products, addProduct, updateProduct, removeProduct } = useInventoryStore();
  const [form, setForm] = useState({ id: &quot;&quot;, name: &quot;&quot;, sku: &quot;&quot;, price: 0, stock: 0, minStock: 0 });

  const submit = (e) => {
    e.preventDefault();
    if (!form.id) {
      const id = crypto.randomUUID();
      addProduct({ ...form, id, price: Number(form.price), stock: Number(form.stock), minStock: Number(form.minStock) });
    } else {
      updateProduct(form.id, { ...form, price: Number(form.price), stock: Number(form.stock), minStock: Number(form.minStock) });
    }
    setForm({ id: &quot;&quot;, name: &quot;&quot;, sku: &quot;&quot;, price: 0, stock: 0, minStock: 0 });
  };

  const edit = (p) => setForm(p);
  const del = (id) => removeProduct(id);

  const columns = [
    { key: &quot;name&quot;, label: &quot;Nome&quot; },
    { key: &quot;sku&quot;, label: &quot;SKU&quot; },
    { key: &quot;price&quot;, label: &quot;Preço&quot; },
    { key: &quot;stock&quot;, label: &quot;Estoque&quot; },
    { key: &quot;minStock&quot;, label: &quot;Mínimo&quot; },
  ];

  return (
    <div className=&quot;grid gap-4 md:grid-cols-3&quot;>
      <div className=&quot;card md:col-span-1&quot;>
        <h2 className=&quot;font-semibold mb-3&quot;>{form.id ? &quot;Editar produto&quot; : &quot;Novo produto&quot;}</h2>
        <form onSubmit={submit} className=&quot;space-y-3&quot;>
          <div>
            <label className=&quot;label&quot;>Nome</label>
            <input className=&quot;input&quot; value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          </div>
          <div>
            <label className=&quot;label&quot;>SKU</label>
            <input className=&quot;input&quot; value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} required />
          </div>
          <div className=&quot;grid grid-cols-3 gap-2&quot;>
            <div>
              <label className=&quot;label&quot;>Preço</label>
              <input type=&quot;number&quot; step=&quot;0.01&quot; className=&quot;input&quot; value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
            </div>
            <div>
              <label className=&quot;label&quot;>Estoque</label>
              <input type=&quot;number&quot; className=&quot;input&quot; value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} />
            </div>
            <div>
              <label className=&quot;label&quot;>Mínimo</label>
              <input type=&quot;number&quot; className=&quot;input&quot; value={form.minStock} onChange={e=>setForm({...form, minStock:e.target.value})} />
            </div>
          </div>
          <div className=&quot;flex gap-2&quot;>
            <button className=&quot;btn btn-primary&quot; type=&quot;submit&quot;>{form.id ? &quot;Salvar&quot; : &quot;Adicionar&quot;}</button>
            {form.id && <button onClick={()=>setForm({ id: &quot;&quot;, name: &quot;&quot;, sku: &quot;&quot;, price: 0, stock: 0, minStock: 0 })} type=&quot;button&quot; className=&quot;btn btn-danger&quot;>Cancelar</button>}
          </div>
        </form>
      </div>
      <div className=&quot;md:col-span-2 space-y-3&quot;>
        <div className=&quot;flex items-center justify-between&quot;>
          <h2 className=&quot;font-semibold&quot;>Lista de produtos</h2>
          <ExportButtons filename=&quot;produtos&quot; data={products} />
        </div>
        <Table columns={columns} data={products} />
        <div className=&quot;text-sm text-slate-600&quot;>
          <p className=&quot;mt-2&quot;>Clique em um item para editar ou excluir.</p>
          <ul className=&quot;mt-2&quot;>
            {products.map(p => (
              <li key={p.id} className=&quot;flex justify-between border-b py-1&quot;>
                <span className=&quot;cursor-pointer&quot; onClick={()=>edit(p)}>{p.name} — {p.sku}</span>
                <button className=&quot;text-rose-600&quot; onClick={()=>del(p.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
