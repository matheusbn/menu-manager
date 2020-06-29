import React from 'react'
import { LinearProgress, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: `${theme.palette.primary.main}20`,
    ...theme.flex.center,

    '& img': {
      width: 100,
      display: 'block',
      margin: '0 auto',
      marginBottom: 50,
      boxShadow: theme.shadows[4],
      borderRadius: '50%',
    },
    '& > div': {
      width: 400,
    },
  },
}))

const SplashScreen = ({ loading }) => {
  const classes = useStyles()

  return (
    <Fade in={loading} timeout={300} appear={false}>
      <div className={classes.root}>
        <div>
          <img src="/logo192.png" alt="Menu logo" />
          <LinearProgress />
        </div>
      </div>
    </Fade>
  )
}

export default SplashScreen
