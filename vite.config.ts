/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import saveProjects from './vite-plugin-save-projects';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), saveProjects()],
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
  define: {
    'import.meta.env.INCLUDE_ADMIN': JSON.stringify(mode !== 'production'),
  },
  build: {
    outDir: 'public',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  publicDir: false,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    css: true,
  },
}));
