// vite.config.js
import { defineConfig } from 'vite';
import fs from 'fs-extra';
import path from 'path';

export default defineConfig({
  build: {
    // Add a build hook to run after the build has finished
    onEnd: () => {
      // Get the absolute paths to the source and destination directories
      const srcDir = path.resolve(__dirname, 'data'); // Assuming 'data' is the folder you want to copy
      const destDir = path.resolve(__dirname, 'dist');

      // Use fs-extra to copy the assets folder to the dist directory
      fs.copySync(srcDir, destDir);
    },
  },
});
