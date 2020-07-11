import React, { useRef, useState, useEffect } from 'react'
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
import Toast from 'components/toast'
import ToastContext from 'contexts/toast'
import { setUser, fetchInitialData } from 'actions'
import SplashScreen from 'components/SplashScreen'

const store = createStore(reducer, applyMiddleware(thunk))

export default function App({ Component, pageProps }: AppProps) {
  // there are 2 loading variables to control the splashscreen transition
  const [loading, setLoading] = useState(true)
  const store = useStore(pageProps.initialReduxState)
  const toast = useRef(null)
  const { dispatch } = store

  useEffect(() => {
    initFirebase()
    firebase.auth().onAuthStateChanged(user => {
      setLoading(false)

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
          <ToastContext.Provider value={toast}>
            <CssBaseline />
            <SplashScreen loading={loading} />

            {loading ? null : <Component {...pageProps} />}

            <Toast ref={toast} />
          </ToastContext.Provider>
        </ThemeProvider>
      </Provider>
    </>
  )
}
