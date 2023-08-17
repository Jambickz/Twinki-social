import './Modal.scss'

export const Modal = ({ children }) => {
  return (
    <div className="modal" >
      <div className="modal-container" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
