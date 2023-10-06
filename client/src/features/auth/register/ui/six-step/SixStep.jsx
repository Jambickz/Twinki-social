import { useAppSelector } from '~shared/lib/redux/index.js'

export const SixStep = ({ nextStep }) => {
  const user = useAppSelector(state => state.session.user)
  const nextButton = async () => {
    console.log(user)
  }

  return (
    <div>
      Добавить фотографию
      <button onClick={nextButton}>next</button>
    </div>
  )
}
