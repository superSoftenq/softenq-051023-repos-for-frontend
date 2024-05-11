import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(
    {
        plugins:
            [
                react(),
            ],
        server: {
            proxy: {
                "/api": {
                    target: "http://social-api.gtsk.site",
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
            watch: {
                usePolling: true,
            },
            host: true, // needed for the Docker Container port mapping to work
            strictPort: true, // not necessary
            port: 8000, // you can replace this port with any port
        },
    }
);
