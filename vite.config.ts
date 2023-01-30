import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath, URL } from "url";

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
    plugins: [
      vue(), 
      ssr({
        prerender: true,
      })
    ],
    ssr: {
      noExternal: ['@apollo/client', '@vue/apollo-composable']
    },
    // При сборке проекта в прод режиме ломается зависимость createHttpLink из "@apollo/client"
    // Если в конфиге определить эту глобальную переменную то все заводится
    define: {
      "__DEV__": (mode === "development").toString(),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./assets/style/variables.scss";`
        }
      }
    },
  }
})
