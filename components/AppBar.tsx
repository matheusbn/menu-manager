import React, { useState, useEffect, useRef } from 'react'
import { Button, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const BAR_HEIGHT = 70

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    transition: 'background 0.3s',
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
  icon: {
    color: 'white',
    transition: 'color 0.3s',
  },
}))

export default function NavBar({
  title,
  backButton,
  hamburguer,
}: {
  style?: object
  className?: string

  title: string
  backButton: boolean
  hamburguer: boolean
}) {
  const classes = useStyles()

  return (
    <>
      <header className={classes.root}>
        <div></div>

        <Typography variant="h6" component="h1" className={classes.title}>
          {title}
        </Typography>

        {hamburguer ? (
          <IconButton aria-label="menu">
            <MenuIcon className={classes.icon} />
          </IconButton>
        ) : null}
      </header>

      {/* prevents elements from disappearing behind the appbar */}
      <div style={{ height: BAR_HEIGHT }} />
    </>
  )
}
