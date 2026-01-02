import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                fitone: resolve(__dirname, 'projects/fitone.html'),
                devapp: resolve(__dirname, 'projects/devapp.html'),
                muscle_money: resolve(__dirname, 'projects/muscle-money.html'),
                oracle: resolve(__dirname, 'projects/oracle.html'),
            },
        },
    },
});
