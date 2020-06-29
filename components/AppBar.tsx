import React, { useState, useEffect, useRef } from 'react'
import { Button, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import firebase from 'firebase/app'
import 'firebase/auth'

const BAR_HEIGHT = 60

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    padding: '0 15px',
    zIndex: 90,
    position: 'fixed',
    top: 0,
    display: 'grid',
    gridTemplateColumns: '50px 1fr 50px',
    width: '100vw',
    height: BAR_HEIGHT,
    boxShadow: theme.shadows[4],
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  button: {
    color: 'white',
  },
}))

export default function NavBar({
  title,
  hamburguer,
}: {
  style?: object
  className?: string

  title: string
  hamburguer: boolean
}) {
  const classes = useStyles()

  const signOut = () => {
    // TODO: remove this
    firebase.auth().signOut()
  }

  return (
    <>
      <header className={classes.root}>
        <div></div>

        <Typography
          variant="subtitle1"
          component="h1"
          className={classes.title}
        >
          {title}
        </Typography>

        <Button
          className={classes.button}
          aria-label="logout"
          onClick={signOut}
        >
          Sair
        </Button>
      </header>

      {/* prevents elements from disappearing behind the appbar */}
      <div style={{ height: BAR_HEIGHT }} />
    </>
  )
}
