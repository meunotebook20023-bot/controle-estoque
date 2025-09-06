import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // garante que os assets sejam servidos corretamente
  server: {
    host: true,
    port: 5173
  }
});
