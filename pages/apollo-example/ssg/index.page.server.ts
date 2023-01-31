import createApolloServerInstance from '../../../utils/apollo/createApolloServerInstance';
import { PageContextServer } from '../../../renderer/types';
import { GET_COUNTRIES } from '../../../gql/queryCountry';

// и экспортировать const doNotPrerender = false;
export const doNotPrerender = false;

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContextServer) {
  let countries;
  // Запускается при сборке
  if (!pageContext.apolloClient) {
    const client = createApolloServerInstance();
    const { data } = await client.query({ query: GET_COUNTRIES });
    countries = data;
  } else {
    // Живет в дев режиме
    const { data } = await pageContext.apolloClient.query({
      query: GET_COUNTRIES,
    });
    countries = data.countries;
  }

  return {
    pageContext: {
      pageProps: { countries },
    },
  };
}
