import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Importa estilos globais (ex.: Tailwind)

// 🔹 Pega o elemento root do index.html
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento #root não encontrado no index.html");
}

// 🔹 Renderiza a aplicação React
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
