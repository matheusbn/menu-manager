import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import NavBar from 'components/NavBar'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: `${NavBar.DRAWER_WIDTH}px 1fr`,
    },
  },
  main: {
    paddingTop: theme.mixins.toolbar.minHeight,
  },
}))

interface NavLayoutProps {
  children: React.ReactNode
  style?: object
  className?: string
}

export default function NavLayout({
  children,
  style,
  className,
}: NavLayoutProps) {
  const classes = useStyles()

  return (
    <div className={classes.layout}>
      <NavBar />
      <main style={style} className={clsx(classes.main, className)}>
        {children}
      </main>
    </div>
  )
}
