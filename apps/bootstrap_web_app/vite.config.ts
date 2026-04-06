import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5182 },
  preview: { port: 5182 },
  envPrefix: 'VITE_',
});
