import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	preview: {
		port: 5173,
	},
	server: {
		host: "0.0.0.0", // Écoute sur toutes les interfaces
		port: 5173, // Assure que le port est défini
		proxy: {
			"/api": {
				target: "http://backend:3000",
				changeOrigin: true,
			},
		},
	},
});
