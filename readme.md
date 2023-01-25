# vite-ssr-plugin boilerplate
Шаблон для проекта с использованием [`vite-ssr-plugin`](https://vite-plugin-ssr.com), vue3, ts

## Подготовка

1. Установить зависимости `yarn install`.
2. Запустить сборку в дев режиме  `yarn dev`.
3. Собрать прод режиме `yarn preview`.
4. Открыть http://localhost:3000 в браузере.

## Краткое описание со ссылками на документацию

### [Pre-rendering (SSG)](https://vite-plugin-ssr.com/pre-rendering)

В файле [vite.config.ts](vite.config.ts)
```js
    plugins: {
        ssr({
            prerender: true,
        })
    }
```
Эта опция включает генерацию всех страниц во время билда проекта.

В файле [_default.page.server.ts](renderer/default.page.server.ts) отключаем пререндер для всех файлов

```js
export const doNotPrerender = true;
```

Теперь для страниц для которых мы хотим включить статическую генерацию мы создаем файл `pageName.page.server.ts` и в нем перезаписываем эту переменную

```js
export const doNotPrerender = false;
```

### [SSR + SPA](https://vite-plugin-ssr.com/render-modes#spa)

`vite-ssr-plugin` по умолчанию работает в режиме SSR.

Чтобы при навигации не запрашивать каждый раз новый HTML нужно в файле [_default.page.client](renderer/_default.page.client.ts) указать должно ли приложение использовать [клиентский роутинг](https://vite-plugin-ssr.com/server-routing-vs-client-routing#client-routing).

```js
export const clientRouting = true;
```

### [Client Only](https://vite-plugin-ssr.com/render-modes#spa)

Чтобы создать страницу на клиенте, эту страницу следует называть `pageName.page.client.vue`


### [I18n](https://vue-i18n.intlify.dev/)

Использование аналогично vue2
Конфигурация в [i18n-config.ts](./locales/i18n-config.ts).

### [VueX](https://vuex.vuejs.org/)