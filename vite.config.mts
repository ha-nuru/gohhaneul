import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  root: ".",
  base: "./",
  server: {
    host: true,      // 또는 "0.0.0.0"
    port: 5173,
    strictPort: true // 5173 고정(다른 포트로 바뀌는 것 방지)
  },
  build: {
    outDir: "dist"
  }
});