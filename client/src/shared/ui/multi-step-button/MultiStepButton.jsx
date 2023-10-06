import './MultiStepButton.scss'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import Button from '../button/index.js'

export const MultiStepButton = ({ prevStep, onClose, link = '/' }) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    if (prevStep) return prevStep()
    else if (onClose) {
      onClose()
      navigate(link)
    }
  }, [prevStep, onClose, link, navigate])

  return (
    <Button className="navigation-button" onClick={handleClick}>
      {prevStep ? <FiArrowLeft className="icon" /> : <FiX className="icon" />}
    </Button>
  )
}
