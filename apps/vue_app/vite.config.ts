import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  server: { port: 5179 },
  preview: { port: 5179 },
  envPrefix: 'VITE_',
});
