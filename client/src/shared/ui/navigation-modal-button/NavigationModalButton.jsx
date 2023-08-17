import './NavigationModalButton.scss'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const NavigationModalButton = ({ setStep, step, link = '/' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (step >= 2) setStep(prevStep => prevStep - 1)
    else {
      if (link) navigate(link)
    }
  }
  return (
    <button className="navigation-button" onClick={handleClick}>
      {step >= 2 ? <FiArrowLeft className="icon" /> : <FiX className="icon" />}
    </button>
  )
}
export { NavigationModalButton }
