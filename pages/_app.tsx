import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import '../index.css'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from '../theme'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { useStore } from '../store'
import reducer from 'reducer'
import { Provider } from 'react-redux'
import initFirebase from 'services/initFirebase'

const store = createStore(reducer, applyMiddleware(thunk))

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  useEffect(() => {
    initFirebase()

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Menu</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
