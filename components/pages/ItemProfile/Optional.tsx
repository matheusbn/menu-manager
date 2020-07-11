import React, { useRef, useState, useEffect } from 'react'
import {
  Tooltip,
  IconButton,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import MenuItem from 'models/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { formatMoney } from 'helpers'
import NavLayout from 'components/NavLayout'
import OptionalDialog from './OptionalDialog'
import useSetState from 'hooks/useSetState'
import OptionalInput from './OptionalInput'
import remove from 'lodash/remove'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    '& .optional-input__option': {
      display: 'flex',
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      margin: `0 ${theme.spacing(1)}px`,
      padding: theme.spacing(1),
      '&:last-child': {
        border: 'none',
      },
    },
    '& .optional-input__option-name': {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['700'],
    padding: theme.spacing(2),
  },
  titleContainer: {
    width: '100%',
    height: 60,
    // display: 'flex',
    // alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
  },
  requiredBadge: {
    ...theme.typography.button,
    fontSize: '0.6rem',
    letterSpacing: '0.06em',
    padding: '2px 5px',
    borderRadius: 100,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  option: {
    padding: theme.spacing(2),
    '&:not(last-child)': {
      borderBottom: theme.border.light,
    },
  },
}))

const Observation = ({ requiredObj }) => {
  const { min, max } = requiredObj

  if ((!min && !max) || max === 1) return <div />

  let text
  if (max > 1) text = `Escolha até ${max} opções`
  else text = `Escolha no mínimo ${min} ${min > 1 ? 'opções' : 'opção'}`

  return <Typography variant="caption">{text}</Typography>
}

interface OptionalProps {
  optional: Optional
}

const Optional = ({ optional }: OptionalProps) => {
  const classes = useStyles()
  const [optionalDialogOpen, setOptionalDialogOpen] = useState(false)

  const openOptionalDialog = () => setOptionalDialogOpen(true)
  const closeOptionalDialog = () => setOptionalDialogOpen(false)

  return (
    <>
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          <div className={classes.row}>
            <Typography className={classes.title} variant="body2">
              {optional.name}
            </Typography>
            <IconButton onClick={openOptionalDialog}>
              <EditIcon color="inherit" />
            </IconButton>
          </div>
          <div className={classes.row}>
            <Observation requiredObj={optional.required} />

            {/* {optional?.required?.min && (
              <div className={classes.requiredBadge}>Obrigatório</div>
            )} */}
          </div>
        </div>
        <div className={classes.options}>
          {optional.options.map(option => (
            <div className={clsx(classes.option, classes.row)}>
              <Typography variant="body1">{option.name}</Typography>

              {option.price && (
                <Typography variant="caption">
                  + R$ {formatMoney(option.price)}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
      <OptionalDialog
        open={optionalDialogOpen}
        optional={optional}
        onClose={closeOptionalDialog}
        onChange={console.log}
      />
    </>
  )
}

export default Optional
