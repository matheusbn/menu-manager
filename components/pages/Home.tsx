import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRestaurant } from 'actions'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import useSetState from 'hooks/useSetState'
import NavLayout from 'components/NavLayout'
import PictureInput from 'components/PictureInput'
import TableCodesGenerator from 'components/TableCodesGenerator'
import useToast from 'hooks/useToast'
import isEqual from 'lodash/isEqual'
import { toBase64 } from 'helpers'

const useStyles = makeStyles(theme => ({
  root: {
    // ...theme.flex.center,
    // flexDirection: 'column',
    minHeight: '100vh',
    '& hr': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
  centered: {
    minHeight: '100vh',
    ...theme.flex.center,
  },
  info: {
    maxWidth: 600,
    margin: '0 auto',

    '& .MuiInputBase-input': {
      cursor: (props: any) => (props.editing ? 'text' : 'default'),
    },

    '& > *': {
      marginTop: theme.spacing(3),
      '&:first-child': {
        marginTop: 0,
      },
    },
  },
  cover: {
    width: '100%',
    height: 300,
  },
  address: {
    marginLeft: theme.spacing(5),
  },
  tableCodes: {
    maxWidth: 600,
    margin: '0 auto',
  },
  editButtonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  editControlButtons: {
    ...theme.flex.center,
    height: 60,
    '& > button': {
      display: (props: any) => (props.editing ? 'flex' : 'none'),
    },
  },
}))

const Home = () => {
  const [coverFile, setCoverFile] = useState(null)
  const [loadingSave, setLoadingSave] = useState(false)
  const [editing, setEditing] = useState(false)
  const [warningOpen, setWarningOpen] = useState(false)
  const showToast = useToast()
  const dispatch = useDispatch()
  const classes = useStyles({ editing })
  const restaurant = useSelector(state => state.restaurant)
  const [restaurantData, setRestaurantData] = useSetState({})

  useEffect(() => {
    if (restaurant) setRestaurantData(restaurant.data)
  }, [restaurant])

  const allowEdit = () => setEditing(true)

  const saveEdit = async () => {
    setLoadingSave(true)
    const data = { ...restaurantData }
    if (coverFile) data.coverPicture = coverFile
    await dispatch(updateRestaurant(data))
    setEditing(false)
    setLoadingSave(false)
    showToast('Informações atualizadas com sucesso!')
  }

  const cancelEdit = () => {
    if (isEqual({ ...restaurant.data }, { ...restaurantData }))
      return setEditing(false)

    setWarningOpen(true)
  }

  const closeDialog = () => setWarningOpen(false)

  const eraseRestaurantData = () => {
    setRestaurantData(restaurant.data)
    closeDialog()
  }

  const createHandler = field => e =>
    setRestaurantData({ [field]: e.target.value })
  const createAddressHandler = field => e =>
    setRestaurantData({
      address: { ...restaurantData.address, [field]: e.target.value },
    })

  const handleCoverChange = async file => {
    setCoverFile(file)
    const pic = await toBase64(file)
    setRestaurantData({ coverPicture: pic })
  }

  if (!restaurant)
    return (
      <NavLayout className={classes.centered}>
        <CircularProgress size={30} />
      </NavLayout>
    )
  return (
    <NavLayout>
      <section className={classes.root}>
        <PictureInput
          value={restaurantData.coverPicture || '/assets/cover-placeholder.png'}
          onChange={handleCoverChange}
          className={classes.cover}
          disabled={!editing}
        />

        <div className={classes.editButtonContainer}>
          <IconButton onClick={allowEdit}>
            <EditIcon color="secondary" />
          </IconButton>
        </div>

        <div className={classes.info}>
          <TextField
            onChange={createHandler('name')}
            fullWidth
            label="Nome"
            value={restaurantData.name || ''}
            InputProps={{
              readOnly: !editing,
            }}
          />

          <TextField
            onChange={createHandler('foodType')}
            fullWidth
            label="Tipo de culinária"
            value={restaurantData.foodType || ''}
            InputProps={{
              readOnly: !editing,
            }}
          />

          <div className={classes.address}>
            <Typography variant="body1" style={{ marginBottom: 10 }}>
              Endereço
            </Typography>

            <Box display="flex">
              <TextField
                onChange={createAddressHandler('state')}
                style={{ marginRight: 30 }}
                margin="dense"
                fullWidth
                label="Estado"
                value={restaurantData.address?.state || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />

              <TextField
                onChange={createAddressHandler('city')}
                margin="dense"
                fullWidth
                label="Cidade"
                value={restaurantData.address?.city || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />
            </Box>

            <TextField
              onChange={createAddressHandler('street')}
              margin="dense"
              fullWidth
              label="Rua"
              value={restaurantData.address?.street || ''}
              InputProps={{
                readOnly: !editing,
              }}
            />

            <Box display="flex">
              <TextField
                onChange={createAddressHandler('number')}
                style={{ marginRight: 30 }}
                margin="dense"
                fullWidth
                label="Número"
                value={restaurantData.address?.number || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />

              <TextField
                onChange={createAddressHandler('complement')}
                margin="dense"
                fullWidth
                label="Complemento"
                value={restaurantData.address?.complement || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />
            </Box>
          </div>

          <TextField
            onChange={createHandler('maxCapacity')}
            fullWidth
            label="Lotação"
            value={restaurantData.maxCapacity || ''}
            InputProps={{
              readOnly: !editing,
            }}
          />

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
        </div>

        <Divider />

        <TableCodesGenerator
          className={classes.tableCodes}
          value={(restaurantData.tableCodes as string[]) || []}
        />
      </section>

      <Dialog
        open={warningOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Há alterações não salvas
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja descartar suas mudanças?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Não
          </Button>
          <Button onClick={eraseRestaurantData} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </NavLayout>
  )
}

export default Home
