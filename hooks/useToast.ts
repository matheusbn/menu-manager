import { useContext } from 'react'
import ToastContext from 'contexts/toast'
import { SnackbarProps } from '@material-ui/core'

export default () => {
  const toastRef = useContext<any>(ToastContext)

  if (toastRef?.current == null) return message => console.log(message)
  const toast = toastRef.current

  return (message: string, options: SnackbarProps = {}) => {
    // // map options to props
    // Object.entries(options).forEach(
    //   ([key, value]) => (toast.props[key] = value)
    // )

    toast.show(message, options)
  }
}
