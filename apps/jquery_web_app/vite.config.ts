import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5183 },
  preview: { port: 5183 },
  envPrefix: 'VITE_',
});
