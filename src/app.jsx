import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./pages/home";
import Produtos from "./pages/produtos"; // ✅ atualizado
import Relatorio from "./pages/Relatorio"; // certifique-se que o arquivo existe: src/pages/relatorio.jsx

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center" 
           style={{ backgroundImage: "url('/OIP.webp')" }}>
        
        {/* Cabeçalho */}
        <header className="bg-black bg-opacity-70 text-white p-4 flex justify-between items-center shadow-lg">
          <h1 className="text-2xl font-bold">📦 Controle de Estoque</h1>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Início
            </NavLink>
            <NavLink
              to="/produtos"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Produtos
            </NavLink>
            <NavLink
              to="/relatorio"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Relatório
            </NavLink>
          </nav>
        </header>

        {/* Conteúdo principal */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
