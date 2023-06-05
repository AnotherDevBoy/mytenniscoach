import '@/styles/globals.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { MyUserContextProvider } from '@/utils/useUser';
import Layout from '@/layouts/layout';
import { Database } from '@/lib/database.types';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  console.log('Initializing PostHog');
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    persistence: 'memory'
  });
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10000 } }
});

export default function App({ Component, pageProps }: any) {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  function getDefaultLayout(page: any) {
    return <Layout>{page}</Layout>;
  }

  const getLayout = Component.getLayout || getDefaultLayout;

  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <PostHogProvider client={posthog}>
            <SessionContextProvider supabaseClient={supabaseClient}>
              <MyUserContextProvider>
                {getLayout(<Component {...pageProps} />)}
              </MyUserContextProvider>
            </SessionContextProvider>
          </PostHogProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}
