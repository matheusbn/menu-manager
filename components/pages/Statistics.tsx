import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import {
  Button,
  Typography,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavLayout from 'components/NavLayout'
import SessionsPerDayChart from 'components/SessionsPerDayChart'
import firebase from 'firebase/app'
import 'firebase/auth'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(3),
  },
}))

const Statistics = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  return (
    <NavLayout>
      <section className={classes.root}>
        <Typography variant="h6" component="h2" gutterBottom>
          Sessões por dia
        </Typography>

        <SessionsPerDayChart />
      </section>
    </NavLayout>
  )
}

export default Statistics
