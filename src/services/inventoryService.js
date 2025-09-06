// Aqui você pode integrar com sua API/ERP.
// Por enquanto, deixamos funções mock para ilustrar os pontos de integração.
export async function fetchProducts() {
  return [];
}

export async function syncInventory(payload) {
  // Envie para sua API e retorne status
  return { ok: true };
}
