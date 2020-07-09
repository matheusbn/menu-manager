import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { makeStyles } from '@material-ui/core/styles'

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
    marginLeft: theme.spacing(1),
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

  const addOption = () => setOptions(prev => [...prev, {}])

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

  const createOptionNameHandler = optionName => e => {
    setOptions(
      options.map(option => {
        if (option.name !== optionName) return option
        return {
          ...option,
          name: e.target.value,
        }
      })
    )
  }

  const createOptionPriceHandler = optionName => e => {
    setOptions(
      options.map(option => {
        if (option.name !== optionName) return option
        return {
          ...option,
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
          <div className={classes.row}>
            <div className={classes.outlineBox}>
              <div />
            </div>
            <div className={classes.row} key={option.name}>
              <TextField
                fullWidth
                onChange={createOptionNameHandler(option.name)}
                label="Nome"
                value={option.name}
                required
                className={classes.input}
              />
              <TextField
                onChange={createOptionPriceHandler(option.name)}
                value={option.price}
                label="Preço"
                type="number"
                className={classes.input}
              />
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
