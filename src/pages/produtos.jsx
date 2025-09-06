import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Produtos() {
  const [barcode, setBarcode] = useState("");
  const [produto, setProduto] = useState({
    nome: "",
    marca: "",
    validade: "",
    quantidade: "",
    preco: "",
    imagem: ""
  });
  const [produtosLista, setProdutosLista] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Buscar produto pela API OpenFoodFacts
  const buscarProduto = async () => {
    if (!barcode) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await res.json();

      if (data.status === 1) {
        setProduto((prev) => ({
          ...prev,
          nome: data.product.product_name || "",
          marca: data.product.brands || "",
          imagem: data.product.image_url || ""
        }));
      } else {
        alert("Produto não encontrado. Preencha manualmente.");
      }
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      alert("Erro na busca.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Upload manual de foto
  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduto((prev) => ({
        ...prev,
        imagem: URL.createObjectURL(file)
      }));
    }
  };

  // 🔹 Salvar produto na lista
  const salvarProduto = () => {
    if (!produto.nome) {
      alert("Informe pelo menos o nome do produto.");
      return;
    }

    setProdutosLista([...produtosLista, produto]);
    setProduto({
      nome: "",
      marca: "",
      validade: "",
      quantidade: "",
      preco: "",
      imagem: ""
    });
    setBarcode("");
  };

  // 🔹 Exportar para Excel
  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(produtosLista);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produtos");
    XLSX.writeFile(wb, "estoque.xlsx");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        📋 Cadastro de Produtos
      </h2>

      {/* Código de barras */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Digite o código de barras"
          className="border p-2 rounded flex-1"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <button
          onClick={buscarProduto}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Buscar
        </button>
      </div>

      {loading && <p>⏳ Buscando produto...</p>}

      {/* Formulário manual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nome do Produto"
          className="border p-2 rounded"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          className="border p-2 rounded"
          value={produto.marca}
          onChange={(e) => setProduto({ ...produto, marca: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={produto.validade}
          onChange={(e) =>
            setProduto({ ...produto, validade: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="border p-2 rounded"
          value={produto.quantidade}
          onChange={(e) =>
            setProduto({ ...produto, quantidade: e.target.value })
          }
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          className="border p-2 rounded"
          value={produto.preco}
          onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
        />

        {/* Upload de foto manual */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFoto}
          className="border p-2 rounded"
        />
      </div>

      {/* Imagem */}
      {produto.imagem && (
        <img
          src={produto.imagem}
          alt="Produto"
          className="w-32 mt-4 rounded shadow"
        />
      )}

      {/* Botões */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={salvarProduto}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Salvar Produto
        </button>
        <button
          onClick={exportarExcel}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          📑 Exportar Excel
        </button>
      </div>

      {/* Lista de produtos */}
      {produtosLista.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="font-bold mb-2">📦 Produtos cadastrados:</h3>
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-2">Foto</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Marca</th>
                <th className="p-2">Qtd</th>
                <th className="p-2">Validade</th>
                <th className="p-2">Preço</th>
              </tr>
            </thead>
            <tbody>
              {produtosLista.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">
                    {p.imagem && (
                      <img
                        src={p.imagem}
                        alt={p.nome}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-2">{p.nome}</td>
                  <td className="p-2">{p.marca}</td>
                  <td className="p-2">{p.quantidade}</td>
                  <td className="p-2">{p.validade}</td>
                  <td className="p-2">R$ {p.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
