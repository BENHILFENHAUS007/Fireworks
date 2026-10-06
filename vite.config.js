import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(function (_a) {
    var command = _a.command, mode = _a.mode;
    // FOR NETLIFY CUSTOM DOMAIN: Always use '/'
    // GitHub Pages needs '/heisenberg/', but Netlify custom domain needs '/'
    var base = '/';
    return {
        plugins: [react()],
        // Root base path for Netlify custom domain
        base: base,
        // Shadcn path resolution
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        // Build optimizations
        build: {
            outDir: 'dist',
            sourcemap: false,
            // Faster & safer build
            minify: 'esbuild',
            // Disable heavy code splitting
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
            // Avoid warning spam
            chunkSizeWarningLimit: 1500,
        },
        // Dev server
        server: {
            port: 3000,
            open: true,
        },
        // Preview
        preview: {
            port: 4173,
        },
    };
});
