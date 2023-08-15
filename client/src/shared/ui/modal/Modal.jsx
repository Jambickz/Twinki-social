import './Modal.scss'

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'modal actived' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal-container actived' : 'modal-container'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
export { Modal }
