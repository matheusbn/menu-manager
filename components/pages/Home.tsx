import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { updateRestaurant } from 'actions'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  CircularProgress,
  Button,
  IconButton,
  Divider,
  Chip,
  Typography,
  TextField,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import useSetState from 'hooks/useSetState'
import NavLayout from 'components/NavLayout'
import CoverPictureUpload from 'components/CoverPictureUpload'
import isEqual from 'lodash/isEqual'
import { toBase64 } from 'helpers'

const useStyles = makeStyles(theme => ({
  root: {
    // ...theme.flex.center,
    // flexDirection: 'column',
    minHeight: '100vh',
    '& hr': {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
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
      cursor: props => (props.editing ? 'text' : 'default'),
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
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  editButtonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  editControlButtons: {
    ...theme.flex.center,
    height: 60,
    '& > button': {
      display: props => (props.editing ? 'block' : 'none'),
    },
  },
}))

const Home = () => {
  const [coverFile, setCoverFile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [warningOpen, setWarningOpen] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles({ editing })
  const restaurant = useSelector(state => state.restaurant)
  const [restaurantData, setRestaurantData] = useSetState([])

  useEffect(() => {
    if (restaurant) setRestaurantData(restaurant.data)
  }, [restaurant])

  const allowEdit = () => setEditing(true)

  const saveEdit = async () => {
    await dispatch(
      updateRestaurant({ ...restaurantData, coverPicture: coverFile })
    )
    setEditing(false)
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
        <CoverPictureUpload
          value={restaurantData.coverPicture}
          onChange={handleCoverChange}
          className={classes.cover}
          editing={editing}
        />

        <div className={classes.editButtonContainer}>
          <IconButton className={classes.editButton} onClick={allowEdit}>
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
            <Button variant="contained" onClick={saveEdit}>
              Salvar
            </Button>
            <Button onClick={cancelEdit}>Cancelar</Button>
          </div>
        </div>

        <Divider />

        <div className={classes.tableCodes}>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            Códigos de mesa
          </Typography>

          {restaurant.data.tableCodes.map(code => (
            <Chip label={code} key={code} />
          ))}
        </div>
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