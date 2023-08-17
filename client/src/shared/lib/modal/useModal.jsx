import { useState } from 'react'

export const useModal = () => {
  const [modals, setModals] = useState([])

  const open = (modal) => {
    setModals([...modals, modal])
  }

  const close = () => {
    setModals(modals.slice(0, -1))
  }

  return { open, close, modals }
}
