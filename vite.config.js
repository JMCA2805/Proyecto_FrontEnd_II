import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,jpg,svg}"],
      },
      includeAssets: ['**/*.{js,jsx,css,html,ico,png,jpg,svg}'],
      manifest: {
        id: "/",
        name: "WebStore Wonderland App",
        short_name: "WebStore Wonderland",
        background_color: "#f5f5f5",
        dir: "ltr",
        description:
          "Aplicación web progresiva de WebStore Wonderland para comprar los mejores electrónicos.",
        icons: [
          {
            src: "logo-32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        display_override: ["standalone", "fullscreen"],
        display: "standalone",
        Lang: "es-ES",
        scope: "/",
        start_url: "/",
        theme_color: "#213ae1",
      },
      devOptions: {
        enabled: true,
        type: 'module',
      }
    }),
  ],
  server: {
    port: 3000,
  },
});
