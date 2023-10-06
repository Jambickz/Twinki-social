export const SecondStep = ({ form, prevStep, nextStep }) => {
  const name = form.getFieldValue('name')
  const email = form.getFieldValue('email')
  const birthdate = form.getFieldValue('birthdate')

  return (
    <div>
      <p onClick={prevStep}>Username from FirstStep: {name}</p>
      <p onClick={prevStep}>Email from FirstStep: {email}</p>
      <p onClick={prevStep}>BirthDate from FirstStep: {birthdate}</p>
      <button onClick={nextStep}>Next</button>
    </div>
  )
}
