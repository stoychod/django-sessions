import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      routes: "/src/routes",
      store: "/src/store",
      api: "/src/api",
    },
  },
});
