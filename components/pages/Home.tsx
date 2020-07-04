import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import {
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
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { makeStyles } from '@material-ui/core/styles'
import Restaurant from 'models/Restaurant'
import NavLayout from 'components/NavLayout'
import firebase from 'firebase/app'

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
    objectFit: 'cover',
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
  const [editing, setEditing] = useState(false)
  const classes = useStyles({ editing })
  const restaurant = useSelector(state => state.restaurant)

  const allowEdit = () => setEditing(true)

  if (!restaurant)
    return (
      <NavLayout className={classes.centered}>
        <CircularProgress size={30} />
      </NavLayout>
    )
  return (
    <NavLayout>
      <section className={classes.root}>
        <img
          src={restaurant.coverPicture}
          className={classes.cover}
          alt="Imagem de fundo do restaurnate"
        />

        <div className={classes.editButtonContainer}>
          <IconButton className={classes.editButton} onClick={allowEdit}>
            <EditIcon color="secondary" />
          </IconButton>
        </div>

        <div className={classes.info}>
          <TextField
            fullWidth
            label="Nome"
            defaultValue={restaurant.name || ''}
            InputProps={{
              readOnly: !editing,
            }}
          />

          <TextField
            fullWidth
            label="Tipo de culinária"
            defaultValue={restaurant.foodType || ''}
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
                style={{ marginRight: 30 }}
                margin="dense"
                fullWidth
                label="Estado"
                defaultValue={restaurant.address?.state || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Cidade"
                defaultValue={restaurant.address?.city || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />
            </Box>

            <TextField
              margin="dense"
              fullWidth
              label="Rua"
              defaultValue={restaurant.address?.street || ''}
              InputProps={{
                readOnly: !editing,
              }}
            />

            <Box display="flex">
              <TextField
                style={{ marginRight: 30 }}
                margin="dense"
                fullWidth
                label="Número"
                defaultValue={restaurant.address?.number || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Complemento"
                defaultValue={restaurant.address?.complement || ''}
                InputProps={{
                  readOnly: !editing,
                }}
              />
            </Box>
          </div>

          <TextField
            fullWidth
            label="Lotação"
            defaultValue={restaurant.maxCapacity || ''}
            InputProps={{
              readOnly: !editing,
            }}
          />

          <div className={classes.editControlButtons}>
            <Button variant="contained">Salvar</Button>
            <Button variant="outline">Cancelar</Button>
          </div>
        </div>

        <Divider />

        <div className={classes.tableCodes}>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            Códigos de mesa
          </Typography>

          {restaurant.tableCodes.map(code => (
            <Chip label={code} key={code} />
          ))}
        </div>
      </section>
    </NavLayout>
  )
}

export default Home
