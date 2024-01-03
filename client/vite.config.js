import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Set up a proxy for requests starting with "/api"
    proxy: {
      "/api": {
        // Redirect the requests to the target URL
        target: "http://localhost:5000/api",
        // Change the origin of the request to match the target
        changeOrigin: true,
        // Rewrite the path by removing the "/api" prefix
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
