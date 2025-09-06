# Controle de Estoque — Projeto Completo (CRA + Tailwind)

Foco em **precisão**, **redução de perdas** e **facilidade de uso**.

## Como usar
1. Instale dependências:
   ```bash
   npm install
   ```
2. Rodar em desenvolvimento:
   ```bash
   npm start
   ```
3. Build de produção:
   ```bash
   npm run build
   ```

## Principais recursos
- Cadastro de produtos, mínimos e estoque.
- Movimentos de entrada/saída com impacto no saldo.
- Dashboard com indicadores e alertas de baixo estoque.
- Exportação para **Excel** e **CSV**.
- Página de **Relatório de Comissão por Venda** baseada no layout enviado.
- Estrutura preparada para integração com API/ERP.

## Boas práticas implementadas
- **Tailwind CSS** para UI rápida e consistente.
- **React Router** para rotas.
- **Zustand (persist)** para estado com persistência local.
- Pastas por domínio: `pages`, `components`, `store`, `services`, `utils`.
- Scripts de `lint` e `format`.

## Onde integrar
- Edite `src/services/inventoryService.js` para conectar com seu backend.
- Substitua os dados mock em `pages/reports/CommissionReport.jsx` pela sua consulta.
