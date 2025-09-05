import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Ícones (hambúrguer e fechar)
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import RelatorioComissao from "./pages/RelatorioComissao";

/* 🔹 Layout principal */
function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">📦 Sistema de Estoque</h1>

          {/* Links Desktop */}
          <div className="hidden md:flex gap-6">
            <NavItem to="/" label="🏠 Início" end />
            <NavItem to="/produtos" label="📋 Produtos" />
            <NavItem to="/relatorio-comissao" label="💰 Comissão" />
          </div>

          {/* Botão hambúrguer - Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-blue-600 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="md:hidden mt-3 flex flex-col gap-3 bg-blue-600 p-4 rounded-lg shadow-lg">
            <NavItem to="/" label="🏠 Início" end onClick={toggleMenu} />
            <NavItem to="/produtos" label="📋 Produtos" onClick={toggleMenu} />
            <NavItem to="/relatorio-comissao" label="💰 Comissão" onClick={toggleMenu} />
          </div>
        )}
      </nav>

      {/* Conteúdo */}
      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <Outlet />
      </main>

      {/* Rodapé */}
      <footer className="bg-blue-700 text-white text-center p-3 mt-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Sistema de Estoque Inteligente - Todos os
          direitos reservados
        </p>
      </footer>
    </div>
  );
}

/* 🔹 Componente para Links de Navegação */
function NavItem({ to, label, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `transition hover:underline ${
          isActive ? "text-yellow-300 font-semibold" : "text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

/* 🔹 Rotas principais */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="relatorio-comissao" element={<RelatorioComissao />} />
        </Route>
      </Routes>
    </Router>
  );
}
