import { Routes, Route, NavLink } from &quot;react-router-dom&quot;;
import Dashboard from &quot;./pages/Dashboard&quot;;
import Products from &quot;./pages/Products&quot;;
import Inventory from &quot;./pages/Inventory&quot;;
import Movements from &quot;./pages/Movements&quot;;
import PurchaseOrders from &quot;./pages/PurchaseOrders&quot;;
import Sales from &quot;./pages/Sales&quot;;
import CommissionReport from &quot;./pages/reports/CommissionReport&quot;;

export default function App() {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg ${isActive ? &quot;bg-sky-600 text-white&quot; : &quot;text-slate-700 hover:bg-slate-100&quot;}`;

  return (
    <div className=&quot;min-h-screen&quot;>
      <header className=&quot;bg-white border-b shadow-sm&quot;>
        <div className=&quot;max-w-7xl mx-auto px-4 py-3 flex items-center gap-4&quot;>
          <h1 className=&quot;text-xl font-semibold&quot;>📦 Controle de Estoque</h1>
          <nav className=&quot;flex items-center gap-2 text-sm&quot;>
            <NavLink to=&quot;/&quot; className={navLinkClass} end>Dashboard</NavLink>
            <NavLink to=&quot;/produtos&quot; className={navLinkClass}>Produtos</NavLink>
            <NavLink to=&quot;/estoque&quot; className={navLinkClass}>Estoque</NavLink>
            <NavLink to=&quot;/movimentos&quot; className={navLinkClass}>Movimentos</NavLink>
            <NavLink to=&quot;/compras&quot; className={navLinkClass}>Compras</NavLink>
            <NavLink to=&quot;/vendas&quot; className={navLinkClass}>Vendas</NavLink>
            <NavLink to=&quot;/relatorio-comissao&quot; className={navLinkClass}>Rel. Comissão</NavLink>
          </nav>
        </div>
      </header>
      <main className=&quot;max-w-7xl mx-auto px-4 py-6&quot;>
        <Routes>
          <Route path=&quot;/&quot; element={<Dashboard />} />
          <Route path=&quot;/produtos&quot; element={<Products />} />
          <Route path=&quot;/estoque&quot; element={<Inventory />} />
          <Route path=&quot;/movimentos&quot; element={<Movements />} />
          <Route path=&quot;/compras&quot; element={<PurchaseOrders />} />
          <Route path=&quot;/vendas&quot; element={<Sales />} />
          <Route path=&quot;/relatorio-comissao&quot; element={<CommissionReport />} />
        </Routes>
      </main>
    </div>
  );
}
