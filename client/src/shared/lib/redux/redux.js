import { useSelector, shallowEqual, useDispatch } from 'react-redux'

export const useAppSelector = selector => useSelector(selector, shallowEqual)
export const useAppDispatch = () => useDispatch()
