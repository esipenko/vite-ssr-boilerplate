import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), ssr(
      {
        prerender: true,
      }
    )],
    ssr: {
      noExternal: ['@apollo/client', '@vue/apollo-composable']
    },
    // При сборке проекта в прод режиме ломается зависимость createHttpLink из "@apollo/client"
    // Если в конфиге определить эту глобальную переменную то все заводится
    define: {
      "__DEV__": (mode === "development").toString(),
    },
  }
})
