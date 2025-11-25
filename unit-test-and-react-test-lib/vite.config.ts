import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineConfig({
    plugins: [react()],
});
const vitestConfig = defineVitestConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
    },
});

export default mergeConfig(viteConfig, vitestConfig);
