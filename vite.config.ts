// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: isDev
      ? {
          proxy: {
            '/api': {
              target: env.VITE_BACKEND_URL,
              changeOrigin: true,
            },
          },
        }
      : {},
  };
});
