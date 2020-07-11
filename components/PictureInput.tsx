import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    '& img': {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  input: {
    display: 'none',
  },
  label: {
    display: 'block',
    height: '100%',
    position: 'relative',

    '&:hover': {
      '& .picture-input__overlay': {
        opacity: (props: any) => !props.disabled && 1,
      },
    },

    '& .picture-input__overlay': {
      cursor: (props: any) => (props.disabled ? 'default' : 'pointer'),
      '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '2rem',
      },
      transition: 'opacity .2s',
      opacity: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 10,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      ...theme.flex.center,
    },
  },
}))

interface PictureInputProps {
  value: string
  className?: string
  disabled?: boolean
  onChange: (file: File) => void
}

const PictureInput = ({
  value,
  onChange,
  disabled,
  className,
}: PictureInputProps) => {
  const classes = useStyles({ disabled })

  const handleUpload = e => {
    onChange(e.target.files[0])
  }

  return (
    <div className={clsx(classes.root, className)}>
      {!disabled && (
        <input
          accept="image/*"
          id="picture-input"
          type="file"
          className={classes.input}
          onChange={handleUpload}
        />
      )}

      <label htmlFor="picture-input" className={classes.label}>
        <div className="picture-input__overlay">
          <EditIcon color="inherit" />
        </div>
        <img src={value} alt="Imagem" />
      </label>
    </div>
  )
}

export default PictureInput
