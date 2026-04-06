import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5181 },
  preview: { port: 5181 },
  envPrefix: 'VITE_',
});
