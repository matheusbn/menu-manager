import React, { useState, useEffect } from 'react'
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
import firebase from 'firebase/app'
import 'firebase/auth'
import { setUser, fetchInitialData } from 'actions'
import SplashScreen from 'components/SplashScreen'

const store = createStore(reducer, applyMiddleware(thunk))

export default function App({ Component, pageProps }: AppProps) {
  // there are 2 loading variables to control the splashscreen transition
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const store = useStore(pageProps.initialReduxState)
  const { dispatch } = store

  useEffect(() => {
    initFirebase()
    firebase.auth().onAuthStateChanged(user => {
      setLoading(false)
      setTimeout(() => setLoaded(true), 300)

      dispatch(setUser(user))
      if (user) {
        dispatch(fetchInitialData(user))
      }
    })

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
          <SplashScreen loading={loading} />

          {loading ? null : <Component {...pageProps} />}
        </ThemeProvider>
      </Provider>
    </>
  )
}
