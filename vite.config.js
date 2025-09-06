import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 🔹 Ajuste para permitir acesso de outros dispositivos na rede
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // Permite acesso externo
    port: 5173,   // Você pode trocar a porta se quiser
  },
});
