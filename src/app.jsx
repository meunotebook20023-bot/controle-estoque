import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Produtos from "./pages/produtos";
import Relatorio from "./pages/Relatorio";
import { Menu } from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Navbar */}
        <header className="bg-blue-700 bg-opacity-90 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-bold">📦 Controle de Estoque</h1>

            {/* Menu desktop */}
            <nav className="hidden md:flex gap-6">
              <NavLink to="/" end className="hover:underline hover:text-yellow-300">
                🏠 Início
              </NavLink>
              <NavLink to="/produtos" className="hover:underline hover:text-yellow-300">
                📋 Produtos
              </NavLink>
              <NavLink to="/relatorio" className="hover:underline hover:text-yellow-300">
                📊 Relatório
              </NavLink>
            </nav>

            {/* Botão mobile */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Menu mobile */}
          {menuOpen && (
            <nav className="flex flex-col mt-3 md:hidden bg-blue-800 rounded-lg p-3 space-y-2">
              <NavLink to="/" end className="hover:underline hover:text-yellow-300">
                🏠 Início
              </NavLink>
              <NavLink to="/produtos" className="hover:underline hover:text-yellow-300">
                📋 Produtos
              </NavLink>
              <NavLink to="/relatorio" className="hover:underline hover:text-yellow-300">
                📊 Relatório
              </NavLink>
            </nav>
          )}
        </header>

        {/* Conteúdo */}
        <main className="p-4 sm:p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Routes>
        </main>

        {/* Rodapé */}
        <footer className="bg-blue-700 bg-opacity-90 text-white text-center p-3 mt-6">
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} Sistema de Estoque Inteligente - Todos os direitos reservados
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
