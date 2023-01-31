import { gql } from '@apollo/client/core';
import { useQuery } from '@vue/apollo-composable';

export default function testApolloRequest() {
  const { result } = useQuery(gql`
    {
      countries {
        code
        name
      }
    }
  `);
  return { result };
}
