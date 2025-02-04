import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Providers } from '@/app/providers/providers'
import { wrapper } from '@/app/store'
import { Cross } from '@/shared/assets/icons/Cross'
import { useLoader } from '@/shared/hooks/useLoader'
import { NextPage } from 'next'

import '@/styles/nprogress.scss'
import '@/styles/variables/index.scss'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(pageProps)
  const getLayout = Component.getLayout ?? (page => page)

  useLoader()

  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
        closeButton={({ closeToast }) => (
          <button className={'closeBtnToast'} onClick={closeToast} type={'button'}>
            <Cross />
          </button>
        )}
        position={'bottom-left'}
      />
      <Providers>{getLayout(<Component {...props} />)}</Providers>
    </Provider>
  )
}

export default App
