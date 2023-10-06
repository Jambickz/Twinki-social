export const SevenStep = ({ nextStep }) => {

  const nextButton = async () => {
    nextStep()
  }
  return (
    <div>
      Добавить фото
      <button onClick={nextButton}>next</button>
    </div>
  )
}
