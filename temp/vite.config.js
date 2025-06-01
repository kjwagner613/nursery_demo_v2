import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react() // Add both plugins inside a single `defineConfig`
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
