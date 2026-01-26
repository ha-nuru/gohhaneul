import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command, mode }) => {
  // 개발 환경에서는 상대 경로, 빌드 시에는 절대 경로
  const base = command === 'build' ? "/gohhaneul/" : "./";

  return {
    plugins: [react()],
    base: base,
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
    preview: {
      host: true,
      port: 4173,
      strictPort: true,
    },
    build: {
      outDir: "dist",
      cssCodeSplit: false,
    },
  };
});