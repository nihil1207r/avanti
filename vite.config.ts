import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  build: {
    // Target modern browsers for smaller, faster output
    target: "es2020",
    // Enable minification
    minify: "esbuild",
    // Generate source maps only in dev
    sourcemap: mode === "development",
    // Raise chunk size warning threshold slightly
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core — almost never changes
          "vendor-react": ["react", "react-dom", "react/jsx-runtime"],
          // Router
          "vendor-router": ["react-router-dom"],
          // Data fetching
          "vendor-query": ["@tanstack/react-query"],
          // i18n
          "vendor-i18n": ["react-i18next", "i18next"],
          // UI utilities
          "vendor-ui": ["lucide-react", "class-variance-authority", "clsx", "tailwind-merge"],
        },
        // Content-hash filenames for long-term caching
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
}));