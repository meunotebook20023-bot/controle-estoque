import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Home from "./pages/home";
import Produtos from "./pages/produtos";
import RelatorioComissao from "./pages/relatoriocomissao";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-700 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">📦 Sistema de Estoque</h1>

            <div className="flex gap-6">
              <Link to="/" className="hover:underline hover:text-yellow-300 transition">
                🏠 Início
              </Link>
              <Link to="/produtos" className="hover:underline hover:text-yellow-300 transition">
                📋 Produtos
              </Link>
              <Link to="/relatorio-comissao" className="hover:underline hover:text-yellow-300 transition">
                💰 Comissão
              </Link>
            </div>
          </div>
        </nav>

        {/* Conteúdo */}
        <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/relatorio-comissao" element={<RelatorioComissao />} />
          </Routes>
        </main>

        {/* Rodapé */}
        <footer className="bg-blue-700 text-white text-center p-3">
          <p className="text-sm">
            © {new Date().getFullYear()} Sistema de Estoque Inteligente - Todos os direitos reservados
          </p>
        </footer>
      </div>
    </Router>
  );
}
