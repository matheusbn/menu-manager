import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import { Typography, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import NavLayout from 'components/NavLayout'
import Item from './Item'
import MenuItem from 'models/MenuItem'
import capitalize from 'lodash/capitalize'
// import Item from 'components/Item'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    padding: theme.spacing(2),
  },
  addButton: {
    position: 'fixed',
    bottom: 30,
    right: 30,
  },
  menuSection: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),

    '&:last-child': {
      border: 'none',
    },
  },
  sectionName: {
    display: 'block',
    fontSize: '1.1rem',
    borderBottom: '1px solid #0004',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
  },
}))

const getDistinctSections = items =>
  items
    .map(i => i.data.section)
    .reduce(
      (acc, section) =>
        !acc.includes(section.toLowerCase())
          ? [...acc, section.toLowerCase()]
          : acc,
      []
    )

const getOrganizedSections = items => {
  const sections = getDistinctSections(items)

  return sections.map(section => ({
    name: section,
    items: items.filter(item => item.data.section.toLowerCase() === section),
  }))
}

function Menu() {
  const classes = useStyles()
  const menuItems = useSelector(state => state.menuItems)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const menuSections = getOrganizedSections(menuItems)

  return (
    <NavLayout>
      <section className={classes.root}>
        {menuSections.map(section => (
          <div className={classes.menuSection} key={section.name}>
            <Typography
              className={classes.sectionName}
              component="h2"
              variant="body2"
            >
              {capitalize(section.name)}
            </Typography>
            {section.items.map(item => (
              <Item
                onClick={() =>
                  Router.push(`/cardapio/[itemId]`, `/cardapio/${item.ref.id}`)
                }
                item={item.data}
                key={item.ref.id}
              />
            ))}
          </div>
        ))}

        <Fab color="primary" aria-label="add" className={classes.addButton}>
          <AddIcon color="inherit" />
        </Fab>
      </section>
    </NavLayout>
  )
}

export default Menu
