import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: { port: 5177 },
  preview: { port: 5177 },
  envPrefix: 'PUBLIC_',
});
