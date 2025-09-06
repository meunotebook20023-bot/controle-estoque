import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // garante caminhos corretos no Vercel
  server: {
    host: true, // permite acessar de outros dispositivos/rede
    port: 5173
  },
  build: {
    outDir: "dist" // diretório de saída para deploy (Vercel/Netlify)
  }
});
