import React, { useState } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from 'models/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { formatMoney } from 'helpers'
import OptionalDialog from './OptionalDialog'
import useSetState from 'hooks/useSetState'
import OptionalInput from './OptionalInput'

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
  titleAndObservation: {
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['700'],
  },
  titleSection: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: 20,
    padding: theme.spacing(1),
    width: '100%',
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

/**
 * Um opcional só é obrigatório quando min > 0
 *
 */
const Observation = ({ requiredObj }) => {
  const { min, max } = requiredObj

  if ((!min && !max) || max === 1) return <div />

  let text
  if (max > 1) text = `Até ${max} opções`
  else text = `No mínimo ${min} ${min > 1 ? 'opções' : 'opção'}`

  return <Typography variant="caption">{text}</Typography>
}

interface OptionalProps {
  optional: Optional
  onDelete: () => void
  onSubmit: (Optional) => void
}

const Optional = ({ optional, onSubmit, onDelete }: OptionalProps) => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  return (
    <>
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <div className={classes.titleAndObservation}>
            <Typography
              variant="body2"
              className={clsx(classes.title, classes.row)}
            >
              {optional.name}
              {optional?.required?.min && (
                <div className={classes.requiredBadge}>Obrigatório</div>
              )}
            </Typography>
            <Observation requiredObj={optional.required} />
          </div>
          <div>
            <IconButton onClick={openDialog}>
              <EditIcon color="inherit" />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon color="inherit" />
            </IconButton>
          </div>
        </div>
        <div>
          {optional.options.map((option, i) => (
            <div className={clsx(classes.option, classes.row)} key={i}>
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
        isUpdate
        open={dialogOpen}
        optional={optional}
        onClose={closeDialog}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default Optional
