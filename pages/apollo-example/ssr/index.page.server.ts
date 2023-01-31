import { GET_COUNTRIES } from '@/gql/queryCountry';
import { PageContextServer } from '@/renderer/types';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContextServer) {
  const { data } = await pageContext.apolloClient.query({
    query: GET_COUNTRIES,
  });

  const { countries } = data;

  return {
    pageContext: {
      pageProps: { countries },
    },
  };
}
