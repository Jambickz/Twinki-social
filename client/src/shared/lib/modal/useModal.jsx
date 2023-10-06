import { useState } from 'react'
import { Modal } from '~shared/ui/modal'

export const useModal = () => {
  const [isOpen, setOpen] = useState(false)
  const [content, setContent] = useState(null)

  const openModal = (c) => {
    setOpen(true)
    setContent(c)
  }

  const closeModal = () => {
    setOpen(false)
    setContent(null)
  }

  const ModalWrapper = () => (
    isOpen && content && (
      <Modal>
        {content}
      </Modal>
    )
  )
  return { openModal, closeModal, ModalWrapper }
}
