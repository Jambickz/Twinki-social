import { useState } from 'react'
import { FifthStep, FirstStep, FourthStep, SecondStep, ThirdStep } from '~features/sign-up'
import { NavigationModalButton as NavButton } from '~shared/ui/navigation-modal-button'
import { useModal } from '~shared/lib/modal'

export const SingUp = () => {
 const {open, close, modals} = useModal()

  const [step, setStep] = useState(1)
  return (
    <div>
      <NavButton step={step} setStep={setStep} />
      <div>
        {step === 1 && <FirstStep setStep={setStep} />}
        {step === 2 && <SecondStep setStep={setStep} />}
        {step === 3 && <ThirdStep />}
        {step === 4 && <FourthStep />}
        {step === 5 && <FifthStep />}
      </div>
    </div>
  )
}
