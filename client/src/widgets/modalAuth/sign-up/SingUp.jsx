import { useState } from 'react'
import { FifthStep, FirstStep, FourthStep, SecondStep, ThirdStep } from '~features/sign-up'
import { NavigationModalButton as NavButton } from '~shared/ui/navigation-modal-button'

export const SingUp = () => {
  const [step, setStep] = useState(4)
  return (
    <div>
      <NavButton step={step} setStep={setStep} />
      <div>
        {step === 1 && <FirstStep />}
        {step === 2 && <SecondStep />}
        {step === 3 && <ThirdStep />}
        {step === 4 && <FourthStep />}
        {step === 5 && <FifthStep />}
      </div>
    </div>
  )
}
