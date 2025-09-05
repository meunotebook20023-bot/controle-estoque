import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Relatorio from "./pages/Relatorio";

function App() {
  return (
    <Router>
      <div>
        <header className="card">
          <h1>📦 Controle de Estoque</h1>
          <nav>
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/relatorio">Relatório</NavLink>
          </nav>
        </header>

        <main className="card">
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

export default App;
