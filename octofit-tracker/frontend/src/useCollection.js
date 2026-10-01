import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

export default function useCollection(resource) {
  const [result, setResult] = useState({ resource, records: [], status: 'loading', error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, controller.signal)
      .then((collection) => {
        setResult({ resource, records: collection, status: 'ready', error: '' })
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setResult({ resource, records: [], status: 'error', error: requestError.message })
      })

    return () => controller.abort()
  }, [resource])

  if (result.resource !== resource) return { records: [], status: 'loading', error: '' }
  return { records: result.records, status: result.status, error: result.error }
}