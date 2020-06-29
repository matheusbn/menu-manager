import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'components/AppBar'
import firebase from 'firebase/app'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const Home = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  return (
    <section className={classes.root}>
      <AppBar title="Nome do Restaurante" />
    </section>
  )
}

export default Home
