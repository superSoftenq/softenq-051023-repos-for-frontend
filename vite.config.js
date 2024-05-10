import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(
    {
        plugins:
            [
                react(),
            ],
        server: {
            port: 8000,
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:3000",
                    changeOrigin: true,
                    rewrite:
                        (
                            path
                        ) =>
                            path.replace(
                                /^\/api/,
                                ""
                            ),
                },
            },
            host: true, // needed for the Docker Container port mapping to work
            strictPort: true, // not necessary
            port: 8000, // you can replace this port with any port
        },
    }
);
