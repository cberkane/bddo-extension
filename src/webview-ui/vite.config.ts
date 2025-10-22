import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@extension": path.resolve(__dirname, "../../src/app"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../out/webview"),
    emptyOutDir: true,
  },
});
