import { useModal } from '~shared/lib/modal'
import { useCallback, useEffect, useState } from 'react'
import { MultiStepButton as NavButton } from '~shared/ui/multi-step-button'
import { FifthStep, FirstStep, FourthStep, SecondStep, ThirdStep, SevenStep, SixStep } from '~features/auth/register'
import { useForm } from 'rc-field-form'

const steps = [
  { component: FirstStep },
  { component: SecondStep },
  { component: ThirdStep },
  { component: FourthStep },
  { component: FifthStep },
  { component: SixStep },
  { component: SevenStep }
]

const Wrapper = ({ components: StepComponent, ...props }) => {
  return (
    <>
      <NavButton {...props} />
      <StepComponent {...props} />
    </>
  )
}

export const Register = ({ setAuthType }) => {
  const { openModal, closeModal, ModalWrapper } = useModal()
  const [step, setStep] = useState(0)
  const [form] = useForm()
  useEffect(() => {
    openModal(renderStep(step))
  }, [step])

  const handleClose = () => {
    closeModal()
    if (setAuthType) setAuthType(null)
  }

  const nextStep = useCallback(() => {
    setStep(prevStep => prevStep + 1)
  }, [])

  const prevStep = useCallback(() => {
    setStep(prevStep => prevStep - 1)
  }, [])

  const renderStep = (currentStep) => {
    const StepComponent = steps[currentStep].component
    const commonProps = { onClose: handleClose, nextStep, form }
    const prevStepProp = (currentStep > 0 && currentStep < 4) ? prevStep : undefined
    return <Wrapper components={StepComponent} {...commonProps} prevStep={prevStepProp} />
  }

  return <ModalWrapper />
}
