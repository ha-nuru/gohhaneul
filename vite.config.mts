import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  root: ".",
  // dist를 어떤 경로에 두더라도 동작하도록 상대 경로 기반으로 빌드
  // (예: http://.../port/ 아래에 올리거나, 로컬에서 dist/index.html을 직접 열어볼 때)
  base: "./",
  build: {
    outDir: "dist"
  }
});

