// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://gabyfidelibus.github.io',
  base: '/portfolio',
  integrations: [
    tailwind({
      // Configuración específica para la integración de Tailwind
      configFile: './tailwind.config.cjs',
    }),
  ],
  build: {
    assets: '_assets'
  }
});