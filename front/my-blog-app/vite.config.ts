import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    postcssPresetEnv({
      autoprefixer: {
        flexbox: '1',
      },
      stage: 3,
    }),
  ],
})
