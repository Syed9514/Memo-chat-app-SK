import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // 1. Include the static assets you generated
      includeAssets: [
        "favicon.ico", 
        "apple-touch-icon.png", 
        "favicon-32x32.png", 
        "favicon-16x16.png",
      ],
      // 2. Define the PWA Manifest
      manifest: {
        name: "Memo Chat",
        short_name: "Memo",
        description: "A modern real-time chat application",
        theme_color: "#1d232a", // Matches your dark theme background
        background_color: "#1d232a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/android-chrome-192x192.png", // Check if you have this file in /public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png", // Check if you have this file in /public
            sizes: "512x512",
            type: "image/png",
          },
          // Fallback: If you don't have android-chrome icons, use your logo.png:
          // {
          //   src: "/logo.png",
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "any maskable"
          // }
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
});