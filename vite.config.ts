import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// GitHub Pages project: https://scorpionlabs-cloud.github.io/oci-finops/
export default defineConfig({
  plugins: [react()],
  base: '/oci-finops/',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
})
