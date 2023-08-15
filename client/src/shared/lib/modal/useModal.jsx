import { createContext, useContext } from 'react'

export const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {}
})

export const useModal = () => {
  return useContext(ModalContext)
}
