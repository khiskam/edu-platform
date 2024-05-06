import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
    server: {
      port: +env.VITE_PORT,
    },
  };
});
