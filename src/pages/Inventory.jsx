import { useInventoryStore } from &quot;../store/inventoryStore&quot;;
import Table from &quot;../components/Table&quot;;

export default function Inventory() {
  const { products } = useInventoryStore();
  const columns = [
    { key: &quot;name&quot;, label: &quot;Produto&quot; },
    { key: &quot;sku&quot;, label: &quot;SKU&quot; },
    { key: &quot;stock&quot;, label: &quot;Estoque&quot; },
    { key: &quot;minStock&quot;, label: &quot;Mínimo&quot; },
  ];
  return (
    <div className=&quot;space-y-3&quot;>
      <h2 className=&quot;font-semibold&quot;>Estoque atual</h2>
      <Table columns={columns} data={products} />
    </div>
  );
}
