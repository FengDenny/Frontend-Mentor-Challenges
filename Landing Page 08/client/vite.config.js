// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'API/'),
      '@helper': path.resolve(__dirname, 'Helper/'),
      '@components': path.resolve(__dirname, 'Components/'),
    },
  },
});