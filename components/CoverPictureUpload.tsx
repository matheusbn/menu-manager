import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    '& img': {
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
      '& .cover-picture__overlay': {
        opacity: (props: any) => props.editing && 1,
      },
    },

    '& .cover-picture__overlay': {
      cursor: (props: any) => (props.editing ? 'pointer' : 'default'),
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

interface CoverPictureUploadProps {
  value: string
  editing: boolean
  className?: string
  onChange: (file: File) => void
}

const CoverPictureUpload = ({
  value,
  onChange,
  editing,
  className,
}: CoverPictureUploadProps) => {
  const dispatch = useDispatch()
  const classes = useStyles({ editing })

  const handleUpload = e => {
    onChange(e.target.files[0])
  }

  return (
    <div className={clsx(classes.root, className)}>
      {editing && (
        <input
          accept="image/*"
          id="cover-picture-input"
          type="file"
          className={classes.input}
          onChange={handleUpload}
        />
      )}

      <label htmlFor="cover-picture-input" className={classes.label}>
        <div className="cover-picture__overlay">
          <EditIcon color="inherit" />
        </div>
        <img src={value} alt="Imagem de fundo do restaurante" />
      </label>
    </div>
  )
}

export default CoverPictureUpload
