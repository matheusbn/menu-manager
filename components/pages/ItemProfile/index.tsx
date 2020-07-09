import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { updateMenuItemData } from 'actions'
import {
  Tooltip,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavLayout from 'components/NavLayout'
import useSetState from 'hooks/useSetState'
import OptionalInput from './OptionalInput'
import firebase from 'firebase/app'
import 'firebase/firestore'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(4),
    paddingTop: theme.spacing(6),
  },
  centered: {
    minHeight: '100vh',
    ...theme.flex.center,
  },
  topSection: {
    display: 'flex',
    alignItems: 'center',
  },
  pictures: {
    width: '45%',
    borderRadius: 4,
    marginRight: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  optionals: {
    padding: theme.spacing(1),

    '& > .MuiTypography-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  editControlButtons: {
    ...theme.flex.center,
    height: 60,
    marginTop: theme.spacing(2),
    // '& > button': {
    //   display: (props: any) => (props.editing ? 'flex' : 'none'),
    // },
  },
}))

const ItemProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const menuItems = useSelector(state => state.menuItems)
  const [loadingSave, setLoadingSave] = useState(false)
  const item = menuItems.find(i => i.id === router.query.itemId)
  const [itemData, setItemData] = useSetState(null)

  const createHandler = field => e => setItemData({ [field]: e.target.value })

  const createOptionalHandler = optionalName => newOptional => {
    console.log(newOptional)
    setItemData({
      optionals: itemData.optionals.map(optional =>
        optional.name === optionalName ? newOptional : optional
      ),
    })
  }

  useEffect(() => {
    if (item) setItemData(item.data)
  }, [item])

  const saveEdit = async () => {
    setLoadingSave(true)

    // console.log(itemData)
    dispatch(updateMenuItemData(item, itemData))

    setLoadingSave(false)
  }

  const cancelEdit = () => {
    // if (isEqual({ ...restaurant.data }, { ...restaurantData }))
    //   return setEditing(false)
    // setWarningOpen(true)
  }

  if (!itemData)
    return (
      <NavLayout className={classes.centered}>
        <CircularProgress size={30} />
      </NavLayout>
    )
  return (
    <NavLayout>
      <section className={classes.root}>
        <div className={classes.topSection}>
          <img
            src={itemData.pictures[0]}
            alt="Foto do prato"
            className={classes.pictures}
          />
          <div>
            <TextField
              onChange={createHandler('name')}
              style={{ marginRight: 30 }}
              fullWidth
              label="Nome"
              value={item.data.name}
              className={classes.input}
            />

            <TextField
              onChange={createHandler('price')}
              fullWidth
              label="Preço"
              type="number"
              value={itemData.price}
              className={classes.input}
            />

            <Tooltip title="Este valor é o que definirá a divisão das seções no aplicativo">
              <TextField
                onChange={createHandler('section')}
                fullWidth
                label="Seção"
                value={itemData.section}
                className={classes.input}
              />
            </Tooltip>

            <TextField
              onChange={createHandler('description')}
              fullWidth
              multiline
              rowsMax={4}
              label="Descrição"
              value={itemData.description}
              className={classes.input}
            />
          </div>
        </div>
        <div className={classes.optionals}>
          <Typography gutterBottom variant="body1">
            Opcionais
          </Typography>
          <OptionalInput
            optional={itemData.optionals[0]}
            onChange={createOptionalHandler(itemData.optionals[0].name)}
          />
          {/* {item.optionals.map(optional => (
            <OptionalInput
              key={optional.name}
              value={optional}
              onChange={console.log}
            />
          ))} */}
        </div>

        <div className={classes.editControlButtons}>
          <Button
            variant="contained"
            onClick={saveEdit}
            endIcon={
              loadingSave && <CircularProgress color="inherit" size={20} />
            }
          >
            Salvar
          </Button>
          <Button onClick={cancelEdit}>Cancelar</Button>
        </div>
      </section>
    </NavLayout>
  )
}

export default ItemProfile
