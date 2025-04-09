const path = require("path");
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");

module.exports = defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: "../dist",
    sourcemap: true,
    emptyOutDir: true,
    // Skip type checking
    typescript: {
      transpileOnly: true,
      noEmit: true,
    }
  },
  root: 'src'
}); 