import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { updateMenuItemData } from 'actions'
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
    dispatch(
      updateMenuItemData(item.ref, {
        optionals: [...(item.data.optionals || []), optional],
      })
    )
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
              onChange={createHandler('price')}
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
