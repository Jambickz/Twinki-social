import './Modal.scss'
import { createPortal } from 'react-dom'

export const Modal = ({ children }) => {
  return createPortal(
    <div className="modal" >
      <div className="modal-container" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>, document.querySelector('#modals'))
}
