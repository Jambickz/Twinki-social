import { useSelector as useAppSelector, shallowEqual, useDispatch as useAppDispatch } from 'react-redux'

export const useSelector = selector => useAppSelector(selector, shallowEqual)
export const useDispatch = () => useAppDispatch()
