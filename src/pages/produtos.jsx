import React, { useState, useEffect } from "react";

export default function Produtos() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [fotoPreview, setFotoPreview] = useState(null); // preview da imagem antes de salvar
  const [produtos, setProdutos] = useState([]);

  // Buscar produtos já salvos no localStorage
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(produtosSalvos);
  }, []);

  // Salvar no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  // Upload de imagem
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result); // mostra a foto imediatamente
      };
      reader.readAsDataURL(file);
    }
  };

  // Cadastrar novo produto
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !codigo) {
      alert("Preencha o nome e o código do produto!");
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
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Código de barras ou interno"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
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

        {/* Preview da imagem antes de cadastrar */}
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

      {/* Lista de produtos cadastrados */}
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
