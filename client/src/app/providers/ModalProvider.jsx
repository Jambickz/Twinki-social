import { useState } from 'react'
import { ModalContext } from '~shared/lib/modal'
import { Modal } from '~shared/ui/modal'
import { createPortal } from 'react-dom'

export const ModalProvider = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const openModal = (modalConfig) => {
    setModalContent(modalConfig)
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
  }

  const valueModalProvider = {
    openModal,
    closeModal
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <ModalContext.Provider value={valueModalProvider}>
      {modalOpened && createPortal(<Modal {...modalContent} />, document.body)}
      {children}
    </ModalContext.Provider>
  )
}
