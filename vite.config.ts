import { defineConfig } from "vite";

export default defineConfig({
  build: {
    modulePreload: false,
    cssCodeSplit: false,
  },
});
