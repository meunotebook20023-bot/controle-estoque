import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Produtos from "./pages/produtos";
import Relatorio from "./pages/Relatorio";

function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }} // coloque sua imagem na pasta public
      >
        {/* Navbar */}
        <header className="bg-blue-700 bg-opacity-90 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">📦 Controle de Estoque</h1>
            <nav className="flex gap-6">
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
          </div>
        </header>

        {/* Conteúdo */}
        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Routes>
        </main>

        {/* Rodapé */}
        <footer className="bg-blue-700 bg-opacity-90 text-white text-center p-3 mt-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Sistema de Estoque Inteligente - Todos os direitos reservados
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
