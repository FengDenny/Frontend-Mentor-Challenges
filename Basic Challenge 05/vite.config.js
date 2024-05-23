// vite.config.js
import { defineConfig } from 'vite';
import fs from 'fs-extra';

export default defineConfig({
  build: {
    // Add a build hook to run after the build has finished
    onEnd: () => {
      // Use fs-extra to copy the assets folder to the dist directory
      fs.copySync('data', 'dist');
    },
  },
});