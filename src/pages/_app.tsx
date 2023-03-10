import { AppProps } from 'next/app';
import { Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';

import { queryClient } from '@/lib/api/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
