import React, { useState, useEffect } from 'react'
import { Paper, IconButton, TextField, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { makeStyles } from '@material-ui/core/styles'
import { createKeyGenerator } from 'helpers'

const keyGen = createKeyGenerator()

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  required: {
    maxWidth: 200,
    display: 'flex',
  },
  input: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
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

interface Props {
  optional: Optional
  onChange: (optional: Optional) => void
}

const OptionalInput = ({ optional, onChange }: Props) => {
  const classes = useStyles()
  const [name, setName] = useState(optional.name)
  const [required, setRequired] = useState<
    { min: number; max: number } | undefined
  >(optional.required)
  const [options, setOptions] = useState<Option[]>(optional.options)

  useEffect(() => {
    onChange({
      name,
      required,
      options,
    })
  }, [name, required, options])

  const addOption = () => setOptions(prev => [...prev, { name: '' }])
  const removeOption = option => {
    setOptions(prev => prev.filter(o => o !== option))
  }

  const handleMin = e =>
    setRequired(prev => ({
      max: prev?.max || 0,
      min: parseInt(e.target.value, 10),
    }))
  const handleMax = e =>
    setRequired(prev => ({
      min: prev?.min || 0,
      max: parseInt(e.target.value, 10),
    }))

  const createOptionNameHandler = option => e => {
    setOptions(
      options.map(opt => {
        if (opt !== option) return opt
        return {
          ...opt,
          name: e.target.value,
        }
      })
    )
  }

  const createOptionPriceHandler = option => e => {
    setOptions(
      options.map(opt => {
        if (opt !== option) return opt
        return {
          ...opt,
          price: Number(e.target.value),
        }
      })
    )
  }

  return (
    <Paper elevation={8} className={classes.root}>
      <div className={classes.row}>
        <TextField
          onChange={e => setName(e.target.value)}
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
            value={required?.min}
            type="number"
            className={classes.input}
          />
          <TextField
            onChange={handleMax}
            value={required?.max}
            label="Máximo"
            type="number"
            className={classes.input}
          />
        </div>
      </div>

      <div className={classes.options}>
        {options.map(option => (
          <div className={classes.row} key={keyGen()}>
            <div className={classes.outlineBox}>
              <div />
            </div>
            <div className={classes.option}>
              <TextField
                fullWidth
                onChange={createOptionNameHandler(option)}
                label="Nome"
                value={option.name}
                required
                className={classes.input}
              />
              <TextField
                onChange={createOptionPriceHandler(option)}
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
    </Paper>
  )
}

export default OptionalInput
