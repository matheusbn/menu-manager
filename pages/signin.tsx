import React from 'react'
import { Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'components/AppBar'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    ...theme.flex.center,
    backgroundColor: `${theme.palette.primary.main}80`,
  },
  box: {
    boxShadow: theme.shadows[4],
    // backgroundColor: theme.palette.grey[100],
    zIndex: 100,
    backgroundColor: theme.palette.background.default,
    height: 440,
    // paddingLeft: 100,
    // paddingRight: 100,
    padding: '30px 80px',
    borderRadius: 8,
    ...theme.flex.center,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '& input': {
      // backgroundColor: theme.palette.background.default,
      minWidth: 300,
    },

    // '& div': {
    //   minWidth: 300,
    //   marginBottom: 15,

    // },
  },
}))

const Signin = () => {
  const classes = useStyles()
  return (
    <section className={classes.root}>
      {/* <AppBar title="Autenticação" /> */}

      <div className={classes.box}>
        <Typography variant="h5" component="h1" color="primary">
          Autenticação
        </Typography>

        <TextField id="email" label="Email" variant="outlined" />
        <TextField
          id="password"
          label="Senha"
          // helperText="Incorrect entry."
          variant="outlined"
        />

        <Button fullWidth variant="contained">
          Entrar
        </Button>
      </div>
    </section>
  )
}

export default Signin
