import React, { useState } from "react";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  return (
    <div>
      <h2>Produtos</h2>
      <p>Lista de produtos em estoque.</p>
      {/* Aqui você pode renderizar uma tabela futuramente */}
    </div>
  );
}

export default Produtos;
