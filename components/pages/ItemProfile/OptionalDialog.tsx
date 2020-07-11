import React, { useState } from 'react'
import {
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Button,
  Typography,
} from '@material-ui/core'
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  inputRequired: {
    minWidth: 70,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  required: {
    maxWidth: 200,
    display: 'flex',
  },
  input: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  optionsTitle: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  options: {
    marginLeft: theme.spacing(4),
  },
  row: {
    display: 'flex',
  },
  outlineBox: {
    marginRight: theme.spacing(1),
    width: 20,
    minHeight: '100%',
    borderLeft: '1px dashed #aaa',
    '& > div': {
      borderBottom: '1px dashed #aaa',
      height: '78%',
    },
  },
  addOptionButton: {
    width: 50,
    marginLeft: -25,
  },
  option: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .option__remove-button': {
      transition: 'opacity .2s',
      opacity: 0,
    },
    '&:hover': {
      '& .option__remove-button': {
        opacity: 1,
      },
    },
  },
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide unmountOnExit direction="up" ref={ref} {...props} />
})

interface OptionalDialogProps {
  isUpdate: boolean
  optional: Optional
  onSubmit: (optional: Optional) => void
  open: boolean
  onClose: () => void
}

const OptionalDialog = ({
  isUpdate,
  optional,
  onSubmit,
  open,
  onClose,
}: OptionalDialogProps) => {
  const classes = useStyles()
  const [name, setName] = useState(optional.name || '')
  const [required, setRequired] = useState<{ min?: number; max?: number }>(
    optional.required || {}
  )
  const [options, setOptions] = useState<Option[]>(optional.options || [])

  const submit = () => {
    const newOptional = {
      name,
      required, // filter
      options: options.filter(o => !!o.name),
    }

    onSubmit(newOptional)
    onClose()
  }

  const handleName = e => setName(e.target.value)

  const handleMin = e => {
    const value = Number(e.target.value)
    setRequired({
      ...required,
      min: isNaN(value) || value < 1 ? undefined : value,
    })
  }
  const handleMax = e => {
    const value = Number(e.target.value)
    setRequired({
      ...required,
      max: isNaN(value) || value < 1 ? undefined : value,
    })
  }

  const addOption = () => {
    const newOptions = [...options, { name: '' }]
    setOptions(newOptions)
  }
  const removeOption = option => {
    const newOptions = options.filter(o => o !== option)
    setOptions(newOptions)
  }

  const createOptionNameHandler = i => e => {
    const newOptions = options.slice()
    newOptions[i].name = e.target.value
    setOptions(newOptions)
  }

  const createOptionPriceHandler = i => e => {
    const newOptions = options.slice()
    const value = Number(e.target.value)
    newOptions[i].price = isNaN(value) ? newOptions[i].price : value

    setOptions(newOptions)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // TransitionComponent={Transition}
      className={classes.root}
    >
      <DialogTitle>{isUpdate ? 'Atualizar' : 'Novo'} Opcional</DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.row}>
          <TextField
            onChange={handleName}
            fullWidth
            label="Nome"
            required
            value={name}
            className={classes.input}
          />
          <div className={classes.required}>
            <TextField
              onChange={handleMin}
              label="Mínimo"
              value={required.min}
              type="number"
              className={clsx(classes.input, classes.inputRequired)}
            />
            <TextField
              onChange={handleMax}
              value={required.max}
              label="Máximo"
              type="number"
              className={clsx(classes.input, classes.inputRequired)}
            />
          </div>
        </div>
        <Typography className={classes.optionsTitle}>Opções</Typography>
        <div className={classes.options}>
          {options.map((option, i) => (
            <div className={classes.row} key={i}>
              <div className={classes.outlineBox}>
                <div />
              </div>
              <div className={classes.option}>
                <TextField
                  fullWidth
                  onChange={createOptionNameHandler(i)}
                  label="Nome"
                  value={option.name}
                  required
                  className={classes.input}
                />
                <TextField
                  onChange={createOptionPriceHandler(i)}
                  value={option.price}
                  label="Preço"
                  type="number"
                  className={classes.input}
                />
                <IconButton
                  className="option__remove-button"
                  onClick={() => removeOption(option)}
                >
                  <RemoveCircleIcon color="inherit" />
                </IconButton>
              </div>
            </div>
          ))}

          <IconButton className={classes.addOptionButton} onClick={addOption}>
            <AddCircleIcon color="inherit" />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} color="primary">
          {isUpdate ? 'Atualizar' : 'Confirmar'}
        </Button>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OptionalDialog
