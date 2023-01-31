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

### [Дата фетчинг](https://vite-plugin-ssr.com/data-fetching)

### [ApolloClient](https://v4.apollo.vuejs.org/)

Ух, на этой либе я от души набил себе шишек.

Прежде всего. Все что в каких-то гайдах импортируется из "@apollo/client"
следует импортировать из "@apollo/client/сore", иначе при сборках все будет падать с ошибкой реакт не найден.

Если используется vite, и падает ошибка `__DEV__ is not defined` проверьте что в [vite.config.ts](./vite.config.ts) добавили

```js
    define: {
      "__DEV__": (mode === "development").toString(),
    },
```

Для использования Apollo мы конфигурируем инстанс на [сервере](./server/index.ts), [передаем его данные](./renderer/_default.page.server.ts) в pageContext на клиент, [где собираем](./renderer/_default.page.client.ts) уже свой клиент.

Дата фетчинг осуществляется тоже по разному

[SSR](./pages/apollo-example/ssr/index.page.server.ts). Внутри pageContext у SSR страниц лежит инстанс ApolloClient. Аналогично тому как запращиваем данные с помощью fetch можем использовать ApolloClient

```ts
    const { data } = await pageContext.apolloClient.query({query: queryName})
```

[SSG](./pages/apollo-example/ssg/index.page.server.ts). В дев режиме у ССГ страницы есть доступ к pageContext. Поэтому в дев режиме действем аналогично SSR. Во время билда к pageContext доступа не имеем. Поэтому создаем новые инстанс и делаем запрос так же как в предыдущем пункте.

[CLientOnly](./pages/apollo-example/client-only/index.page.client.vue). В клиент онли страницах вообще не задействуется серверный код. Тут мы можем использовать `@vue/apollo-composable` внутри `<script setup>` 
