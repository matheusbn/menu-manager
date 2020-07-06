import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Divider,
  Chip,
  Typography,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { generateCodes } from 'actions'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  codes: {
    transition: 'filter 1s',
    filter: (props: any) => props.loading && 'blur(3px)',
    minHeight: 200,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),

    '& > *': {
      margin: 4,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiTypography-root': {
      fontSize: '1.1rem',
      paddingBottom: 2,
    },
  },
  modalContent: {
    // ...theme.flex.center,
    // flexDirection: 'column',
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(2),
    },
  },
}))

interface CoverPictureUploadProps {
  value: string[]
  className?: string
}

const CoverPictureUpload = ({ value, className }: CoverPictureUploadProps) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles({ loading })

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  const handleAmount = e => e.target.value <= 10 && setAmount(e.target.value)

  const handleConfirm = async () => {
    setLoading(true)
    closeDialog()
    await dispatch(generateCodes(Number(amount)))
    setLoading(false)
  }

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.header}>
        <Typography variant="body1">Códigos de mesa</Typography>
        <IconButton onClick={openDialog}>
          <AddCircleIcon color="inherit" />
        </IconButton>
      </div>

      <div className={classes.codes}>
        {value.map(code => (
          <Chip label={code} key={code} />
        ))}
      </div>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Quantos códigos deseja gerar? (Máx 10)
        </DialogTitle>
        <DialogContent className={classes.modalContent}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            variant="outlined"
            label="Quantidade"
            type="number"
            value={amount}
            onChange={handleAmount}
          />

          <DialogContentText variant="caption" id="alert-dialog-description">
            Obs: Os códigos são gerados de forma aleatória.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CoverPictureUpload
