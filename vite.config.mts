import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";

export default defineConfig(({ command }) => {
  // 개발 환경: 상대 경로, 빌드 환경: 절대 경로
  const base = command === 'build' ? "/gohhaneul/" : "./";

  return {
    plugins: [react()],
    base: base,
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
    build: {
      outDir: "dist",
    },
  };
});
