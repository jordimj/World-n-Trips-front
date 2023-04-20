import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: { port: 3000, open: true },
  preview: { port: 3000 },
  build: {
    outDir: 'build',
  },
});
