import { QueryCache, QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60000,
      suspense: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
      if (query.state.data !== undefined) {
        console.log('Error: ', error);
      }
    },
    // onSuccess: (data) => {
    //   console.log(data);
    // },
  }),
});
