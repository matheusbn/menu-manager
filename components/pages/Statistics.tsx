import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavLayout from 'components/NavLayout'
import SessionsPerDayChart from 'components/SessionsPerDayChart'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}))
const Statistics = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  return (
    <NavLayout>
      <section className={classes.root}>
        <Typography variant="h6" component="h2" className={classes.heading}>
          Sessões por dia
        </Typography>

        <SessionsPerDayChart />
      </section>
    </NavLayout>
  )
}

export default Statistics
