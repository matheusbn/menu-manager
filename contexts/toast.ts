import React from 'react'
import Toast from 'components/Toast'

const ToastContext = React.createContext<React.RefObject<
  React.ReactElement
> | null>(null)

export default ToastContext
