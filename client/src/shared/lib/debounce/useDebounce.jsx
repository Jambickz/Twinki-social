import { useEffect, useRef } from 'react'

export const useDebounce = (duration = 500) => {
  const debounceTimeout = useRef(null)
  const handler = (func, newDuration = duration) => {
    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(func, newDuration)
  }
  useEffect(() => {
    return () => clearTimeout(debounceTimeout.current)
  }, [])
  return handler
}
