import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { updateMenuItemData, deleteMenuItem } from 'actions'
import useToast from 'hooks/useToast'
import {
  Tooltip,
  Paper,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { makeStyles } from '@material-ui/core/styles'
import NavLayout from 'components/NavLayout'
import PictureInput from 'components/PictureInput'
import Optional from './Optional'
import OptionalDialog from './OptionalDialog'
import { toBase64 } from 'helpers'
import useSetState from 'hooks/useSetState'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: 1000,
    margin: '0 auto',
    padding: theme.spacing(4),
    paddingTop: 0,
  },
  centered: {
    minHeight: '100vh',
    ...theme.flex.center,
  },
  topSection: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  pictures: {
    minWidth: 420,
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: theme.spacing(4),
      marginRight: 0,
    },
    flex: 'none',
    borderRadius: 4,
    overflow: 'hidden',
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
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    '& .MuiTypography-root': {
      flexGrow: 1,
      textAlign: 'center',
    },
    '& .MuiButtonBase-root': {
      flexGrow: 0,
    },
  },
}))

const ItemProfile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const showToast = useToast()
  const item = useSelector(state =>
    state.menuItems.find(i => i.ref.id === router.query.itemId)
  )
  const [loadingSave, setLoadingSave] = useState(false)
  const [pictureFile, setPictureFile] = useState(null)
  const [itemData, setItemData] = useSetState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  const createHandler = field => e => setItemData({ [field]: e.target.value })

  const handlePrice = e => {
    const price = Number(e.target.value)
    if (isNaN(price)) return

    setItemData({ price })
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  useEffect(() => {
    if (item) {
      setItemData(item.data || {})
    }
  }, [item])

  const handlePictureChange = async file => {
    setPictureFile(file)
    const pic = await toBase64(file).catch(console.error)
    setItemData({ pictures: [pic] })
  }

  const handleAddOptionalSubmit = optional => {
    setItemData({ optionals: [...(itemData.optionals || []), optional] })

    // dispatch(
    //   updateMenuItemData(item.ref, {
    //     optionals: [...(item.data.optionals || []), optional],
    //   })
    // )
  }

  const handleOptionalSubmit = i => optional => {
    const newOptionals = item.data.optionals.slice()
    newOptionals[i] = optional
    dispatch(updateMenuItemData(item.ref, { optionals: newOptionals }))
  }

  const handleOptionalDelete = optionalIndex => {
    const newOptionals = item.data.optionals.filter(
      (_, i) => i !== optionalIndex
    )
    dispatch(updateMenuItemData(item.ref, { optionals: newOptionals }))
  }

  const saveEdit = async () => {
    setLoadingSave(true)

    const data = { ...itemData }
    if (pictureFile) data.pictures = [pictureFile]
    await dispatch(updateMenuItemData(item.ref, data))
    showToast('Item atualizado com sucesso!')
    setLoadingSave(false)
  }

  const cancelEdit = () => {
    console.log(itemData)
    // if (isEqual({ ...restaurant.data }, { ...restaurantData }))
    //   return setEditing(false)
    // setWarningOpen(true)
  }

  const deleteItem = async () => {
    await dispatch(deleteMenuItem(item))
    router.push('/cardapio')
  }

  if (!itemData || !item?.data)
    return (
      <NavLayout className={classes.centered}>
        <CircularProgress size={30} />
      </NavLayout>
    )
  return (
    <NavLayout>
      <section className={classes.root}>
        <div className={classes.heading}>
          <Typography variant="h6" component="p">
            {item.data.name}
          </Typography>

          <div>
            {/* <IconButton onClick={openDialog}>
              <EditIcon color="inherit" />
            </IconButton> */}
            <IconButton onClick={deleteItem}>
              <DeleteIcon color="inherit" />
            </IconButton>
          </div>
        </div>

        <div className={classes.topSection}>
          <PictureInput
            value={itemData.pictures?.[0] || '/assets/picture-placeholder.png'}
            onChange={handlePictureChange}
            className={classes.pictures}
          />

          <div>
            <TextField
              variant="filled"
              onChange={createHandler('name')}
              style={{ marginRight: 30 }}
              fullWidth
              label="Nome"
              value={itemData.name}
              className={classes.input}
            />

            <TextField
              variant="filled"
              onChange={handlePrice}
              fullWidth
              label="Preço"
              type="number"
              value={itemData.price}
              className={classes.input}
            />

            <Tooltip title="Este valor é o que definirá a divisão das seções no aplicativo">
              <TextField
                variant="filled"
                onChange={createHandler('section')}
                fullWidth
                label="Seção"
                value={itemData.section}
                className={classes.input}
              />
            </Tooltip>

            <TextField
              variant="filled"
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
            <IconButton onClick={openDialog}>
              <AddCircleIcon color="inherit" />
            </IconButton>
          </Typography>

          <Paper elevation={8} style={{ padding: 0 }}>
            {itemData.optionals?.map((optional, i) => (
              <Optional
                optional={optional}
                onDelete={() => handleOptionalDelete(i)}
                onSubmit={handleOptionalSubmit(i)}
                key={optional.name}
              />
            ))}
          </Paper>
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

      <OptionalDialog
        open={dialogOpen}
        optional={{ name: '', options: [], required: {} }}
        onClose={closeDialog}
        onSubmit={handleAddOptionalSubmit}
      />
    </NavLayout>
  )
}

export default ItemProfile
