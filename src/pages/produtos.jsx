import React, { useState, useEffect } from "react";

export default function Produtos() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Buscar produtos salvos no localStorage
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(produtosSalvos);
  }, []);

  // Salvar no localStorage sempre que atualizar
  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  // Buscar informações na API pelo código de barras
  const buscarProdutoPorCodigo = async (codigoBarras) => {
    try {
      setCarregando(true);
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${codigoBarras}.json`
      );
      const data = await res.json();

      if (data.status === 1) {
        const produto = data.product;
        setNome(produto.product_name || "Produto sem nome");
        setFotoPreview(produto.image_url || null);
        setQuantidade(1);
      } else {
        alert("Produto não encontrado na base global!");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar informações do produto.");
    } finally {
      setCarregando(false);
    }
  };

  // Quando o usuário digitar o código
  const handleCodigoChange = (e) => {
    const value = e.target.value;
    setCodigo(value);

    if (value.length >= 8) {
      // buscar automático se tiver tamanho suficiente
      buscarProdutoPorCodigo(value);
    }
  };

  // Upload manual de imagem
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
          placeholder="Código de barras"
          value={codigo}
          onChange={handleCodigoChange}
          className="w-full p-2 border rounded-md"
        />

        {carregando && (
          <p className="text-sm text-blue-600">🔄 Buscando informações...</p>
        )}

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
            <p className="text-sm text-gray-600">Imagem do produto:</p>
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
