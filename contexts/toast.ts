import React from 'react'

const ToastContext = React.createContext<React.RefObject<
  React.ReactElement
> | null>(null)

export default ToastContext
