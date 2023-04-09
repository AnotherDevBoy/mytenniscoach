import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { MyUserContextProvider } from '@/utils/useUser';
import Layout from '@/layouts/layout';
import { Database } from '@/lib/database.types';
import NavBar from '@/components/Navbar';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  const currentPage = useRouter().asPath;

  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <Layout>
            {
              currentPage==="/" ? <></> : <NavBar />
            }
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </SessionContextProvider>
    </>
  );
}
