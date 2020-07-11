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

interface OptionWithKey extends Option {
  key?: number
}

const OptionalInput = ({ optional, onChange }: Props) => {
  const classes = useStyles()

  const handleChange = (field, value) => {
    onChange({
      ...optional,
      [field]: value,
    })
  }

  const handleName = e => {
    handleChange('name', e.target.value)
  }
  const handleMin = e => {
    const value = Number(e.target.value)
    const newRequired = {
      ...optional.required,
      min: isNaN(value) || value < 1 ? undefined : value,
    }
    handleChange('required', newRequired)
  }
  const handleMax = e => {
    const value = Number(e.target.value)
    const newRequired = {
      ...optional.required,
      max: isNaN(value) || value < 1 ? undefined : value,
    }
    console.log(value, newRequired)
    handleChange('required', newRequired)
  }

  const addOption = () => {
    const newOptions = [...optional.options, { name: '' }]
    handleChange('options', newOptions)
  }
  const removeOption = option => {
    const newOptions = optional.options.filter(o => o !== option)
    handleChange('options', newOptions)
  }

  const createOptionNameHandler = i => e => {
    const newOptions = optional.options.slice()
    newOptions[i].name = e.target.value
    handleChange('options', newOptions)
  }

  const createOptionPriceHandler = i => e => {
    const newOptions = optional.options.slice()
    const value = Number(e.target.value)
    newOptions[i].price = isNaN(value) ? newOptions[i].price : value
    handleChange('options', newOptions)
  }

  return (
    <Paper elevation={8} className={classes.root}>
      <div className={classes.row}>
        <TextField
          onChange={handleName}
          fullWidth
          label="Nome"
          required
          value={optional.name}
          className={classes.input}
        />
        <div className={classes.required}>
          <TextField
            onChange={handleMin}
            label="Mínimo"
            value={optional.required?.min}
            type="number"
            className={classes.input}
          />
          <TextField
            onChange={handleMax}
            value={optional.required?.max}
            label="Máximo"
            type="number"
            className={classes.input}
          />
        </div>
      </div>

      <div className={classes.options}>
        {optional.options.map((option, i) => (
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
    </Paper>
  )
}

export default OptionalInput
