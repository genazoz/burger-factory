import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import webfontDownload from "vite-plugin-webfont-dl";
import macrosPlugin from "vite-plugin-babel-macros";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap",
    ]),
    macrosPlugin(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
