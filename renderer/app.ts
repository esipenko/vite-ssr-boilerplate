import { createSSRApp, defineComponent, h, markRaw, reactive, createApp, provide } from 'vue';
import PageShell from '../layouts/PageShell.vue';
import { setPageContext } from '../composables/usePageContext';
import type { PageContext } from './types';
import i18n from '../locales/i18n-config';
import { createVuexStore } from '../store/vuex-store';
import { DefaultApolloClient } from '@vue/apollo-composable'

export { createPageApp }

function createPageApp(pageContext: PageContext, clientOnly: boolean, apolloClient: any) {
  const { Page } = pageContext;

  let rootComponent: any;

  const PageWithLayout = defineComponent({
    setup() {
      provide(DefaultApolloClient, apolloClient)
    },
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    created() {
      rootComponent = this;
    },
    render() {
      return h(
        PageShell,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })


  const app = clientOnly ? createApp(PageWithLayout) : createSSRApp(PageWithLayout);
  const store = createVuexStore();
  app.use(store);
  app.use(i18n);

  const pageContextReactive = reactive(pageContext);
  const changePage = (pageContext: PageContext) => {
    Object.assign(pageContextReactive, pageContext)
    rootComponent.Page = markRaw(pageContext.Page)
    rootComponent.pageProps = markRaw(pageContext.pageProps || {})
  }

  const startLoading = () => {
    store.commit('loader/setIsPageLoading', true);
  }
  const stopLoading = () => {
    store.commit('loader/setIsPageLoading', false);
  }

  objectAssign(app, { changePage, startLoading, stopLoading });

  setPageContext(app, pageContextReactive)

  return app
}

// Функиця которую я нашел в репозитории с примерами. 
// Обычный Object.assign но с типами
function objectAssign<Obj extends {}, ObjAddendum>(obj: Obj, objAddendum: ObjAddendum): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}