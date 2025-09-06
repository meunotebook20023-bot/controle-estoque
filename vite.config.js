import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // garante caminhos corretos no Vercel
  server: {
    host: true,
    port: 5173
  }
});
