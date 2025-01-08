import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: { 
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // react core libraries
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/scheduler") ||
            id.includes("node_modules/@radix-ui") ||
            id.includes("node_modules/@floating-ui")
          ) {
            return "@core-vendor";
          }

          if (id.includes("node_modules/d3-scale")) {
            return "@d3-scale-vendor";
          }
          if (id.includes("node_modules/d3-shape")) {
            return "@d3-shape-vendor";
          }
          if (id.includes("node_modules/recharts")) {
            return "@recharts-vendor";
          }

          // firebaseni funksiyalariga qarab chunk qilish
          if (id.includes("node_modules/@firebase/auth")) {
            return "@firebase-auth-vendor";
          }
          if (id.includes("node_modules/@firebase/firestore")) {
            return "@firebase-firestore-vendor";
          }
          if (id.includes(""))
            if (id.includes("node_modules/@firebase/storage")) {
              return "@firebase-storage-vendor";
            }

          // animations
          if (
            id.includes("/motion/") ||
            id.includes("framer-motion") ||
            id.includes("popmotion")
          ) {
            return "@animation-core";
          }

          // i18next
          if (id.includes("i18next") || id.includes("react-i18next")) {
            return "@i18next-vendor";
          }
        },
      },
    },
  },
});
