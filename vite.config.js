import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "/@assets/": resolve(__dirname, "src/assets"),
    },
  },
  // Use this if you're deploying to the root of your domain:
  base: "/",
});
