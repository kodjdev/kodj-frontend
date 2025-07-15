import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [react(), visualizer()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes('node_modules/d3-scale')) {
                        return '@d3-scale-vendor';
                    }
                    if (id.includes('node_modules/d3-shape')) {
                        return '@d3-shape-vendor';
                    }
                    if (id.includes('node_modules/recharts')) {
                        return '@recharts-vendor';
                    }

                    if (id.includes('/motion/') || id.includes('framer-motion') || id.includes('popmotion')) {
                        return '@animation-core';
                    }

                    if (id.includes('i18next') || id.includes('react-i18next')) {
                        return '@i18next-vendor';
                    }
                },
            },
        },
    },
});
