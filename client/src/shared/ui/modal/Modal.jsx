import './Modal.scss'
import { useModal } from '~shared/lib/modal'

export const Modal = ({ children, closes }) => {
  const { closeModal } = useModal()

  const handleClose = () => {
    if (closes) closeModal()
  }

  return (
    <div className="modal" onClick={handleClose} >
      <div className="modal-container" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
