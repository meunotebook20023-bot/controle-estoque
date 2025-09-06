export const toCurrency = (n = 0) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
