import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store/store';
import Layout from '@/components/layout'
import { Provider } from 'react-redux';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Layout>
      <DefaultSeo 
        title='HelperQuest'
        description='Tool to help quest in Final Fantasy 14'
        openGraph={{
          url: 'https://helperquest.com/',
          title: 'HelperQuest',
          description: 'Helping you quest in Final Fantasy 14',
          siteName: 'HelperQuest'
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </Layout>
  </Provider>
}
