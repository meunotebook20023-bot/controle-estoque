import React, { useState, useEffect } from "react";

// Banco de produtos fictício (poderia ser substituído por API externa)
const catalogo = {
  "7894900011517": { nome: "Arroz Branco 5kg", quantidade: 1 },
  "7891910000197": { nome: "Feijão Carioca 1kg", quantidade: 1 },
  "7891000100103": { nome: "Coca-Cola 2L", quantidade: 1 },
  "7891528012226": { nome: "Sabonete Dove", quantidade: 1 },
};

export default function Produtos() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [produtos, setProdutos] = useState([]);

  // Buscar produtos salvos no localStorage
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(produtosSalvos);
  }, []);

  // Salvar no localStorage sempre que atualizar
  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  // Quando o usuário digitar o código, preencher os dados automaticamente
  const handleCodigoChange = (e) => {
    const value = e.target.value;
    setCodigo(value);

    if (catalogo[value]) {
      setNome(catalogo[value].nome);
      setQuantidade(catalogo[value].quantidade);
    }
  };

  // Upload de imagem
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Adicionar produto
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !codigo) {
      alert("Preencha o código e nome do produto!");
      return;
    }

    const novoProduto = { nome, codigo, quantidade, foto: fotoPreview };
    setProdutos([...produtos, novoProduto]);

    // Limpar campos
    setNome("");
    setCodigo("");
    setQuantidade(1);
    setFotoPreview(null);
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📋 Cadastro de Produtos</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Código de barras ou interno"
          value={codigo}
          onChange={handleCodigoChange}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="w-full p-2 border rounded-md"
          min="1"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {fotoPreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Pré-visualização:</p>
            <img
              src={fotoPreview}
              alt="Pré-visualização"
              className="w-24 h-24 object-cover rounded-md border"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition"
        >
          ➕ Adicionar Produto
        </button>
      </form>

      {/* Lista de produtos */}
      <h3 className="text-xl font-semibold mt-6 mb-2">📦 Produtos Cadastrados</h3>
      {produtos.length === 0 ? (
        <p className="text-gray-600">Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul className="space-y-3">
          {produtos.map((p, index) => (
            <li
              key={index}
              className="flex items-center gap-4 border p-3 rounded-md bg-gray-50"
            >
              {p.foto && (
                <img
                  src={p.foto}
                  alt={p.nome}
                  className="w-16 h-16 object-cover rounded-md"
                />
              )}
              <div>
                <p className="font-bold">{p.nome}</p>
                <p className="text-sm text-gray-600">Código: {p.codigo}</p>
                <p className="text-sm text-gray-600">
                  Quantidade: {p.quantidade}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
