import Notify from 'simple-notify'
export const useNotify = () => {
  const showNotification = (options) => {
    // eslint-disable-next-line no-new
    new Notify({
      ...options,
      effect: 'fade',
      speed: 300,
      autotimeout: 3000,
      position: 'right top',
      gap: 20,
      distance: 20
    })
  }

  const success = (title, text) => {
    showNotification({
      status: 'success',
      title: title || 'Success',
      text: text || '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      type: 1
    })
  }


  const warning = (title, text) => {
    showNotification({
      status: 'warning',
      title: title || 'Warning',
      text: text || '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      type: 1
    })
  }

  const error = (title, text) => {
    showNotification({
      status: 'error',
      title: title || 'Error',
      text: text || '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      type: 1
    })
  }

  const info = (title, text) => {
    showNotification({
      status: 'info',
      title: title || 'info',
      text: text || '',
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      type: 1
    })
  }
  return { success, warning, error, info }
}
