import React, { useState, useEffect, useRef } from 'react'
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  ListItemIcon,
  Divider,
  Toolbar,
  AppBar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AssignmentIcon from '@material-ui/icons/Assignment'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import firebase from 'firebase/app'
import 'firebase/auth'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    ...theme.flex.center,
    // justifyContent: 'start',
    // paddingLeft: theme.spacing(1),
    '& img': {
      height: 45,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

const NavBar = () => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(prev => !prev)

  const signOut = () => firebase.auth().signOut()

  const drawer = (
    <div className={classes.drawerRoot}>
      <div>
        <div className={classes.toolbar}>
          <img src="/logo192.png" alt="Menu logo" />
        </div>

        <Divider />

        <List>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Informações" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Cardápio" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Estatísticas" />
          </ListItem>
        </List>
      </div>

      <List>
        <ListItem button onClick={signOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon color="inherit" />
          </IconButton>
          <Typography variant="h6" noWrap>
            Home Burger
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="navigation menu options">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <div style={{ width: drawerWidth }}></div>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}
NavBar.DRAWER_WIDTH = drawerWidth

export default NavBar
