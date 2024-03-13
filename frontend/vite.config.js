import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
// Starting with node 17, localhost resolution favours ipv6 addresses so you need to specify
// the ipv4 address explicitly- https://github.com/vitejs/vite/discussions/7620
      "/api": "http://127.0.0.1:8000",
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
  build: {
    assetsDir: 'static'
  }
});
