import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // react and its core libraries
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/scheduler")
          ) {
            return "@react-vendor";
          }

          // we split the firebase chunks by functionality
          if (id.includes("node_modules/@firebase/auth")) {
            return "@firebase-auth-vendor";
          }
          if (id.includes("node_modules/@firebase/firestore")) {
            return "@firebase-firestore-vendor";
          }
          if (id.includes("node_modules/@firebase/storage")) {
            return "@firebase-storage-vendor";
          }
          // ui animations
          if (
            id.includes("framer-motion") ||
            id.includes("popmotion") ||
            id.includes("style-value-types")
          ) {
            return "@animation-vendor";
          }

          // internationalization
          if (id.includes("i18next") || id.includes("react-i18next")) {
            return "@i18n-vendor";
          }

          // ui component and libraries
          if (
            id.includes("node_modules/@radix-ui") ||
            id.includes("node_modules/@floating-ui")
          ) {
            return "@ui-vendor";
          }

          // data visualization libraries
          if (
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/d3")
          ) {
            return "@viz-vendor";
          }

          // utils and hooks
          if (
            id.includes("/utils/") ||
            id.includes("/hooks/") ||
            id.includes("/lib/")
          ) {
            return "@utils";
          }
        },
      },
    },
  },
});
