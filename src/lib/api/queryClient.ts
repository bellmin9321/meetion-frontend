import { QueryCache, QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
      if (query.state.data !== undefined) {
        console.log('Error: ', error);
      }
    },
  }),
});
