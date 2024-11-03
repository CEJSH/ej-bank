import type { AppProps } from 'next/app'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import Layout from '@shared/Layout'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import AuthGard from '@components/auth/AuthGard'
import Navbar from '@shared/Navbar'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <AuthGard>
              <Navbar />
              <Component {...pageProps} />
            </AuthGard>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
