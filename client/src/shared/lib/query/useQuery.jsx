import { useEffect, useState } from 'react'

export const useQuery = func => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true)
        const result = await func()
        setData(result.data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [func])

  return { data, isLoading, error }
}
