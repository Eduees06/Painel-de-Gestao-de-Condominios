import { useEffect, useState } from 'react'
import { fetchCondominiums } from '../services/api'
import { Condominium } from '../types/condominium'

export function useCondominiums() {
  const [data, setData] = useState<Condominium[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCondominiums()
      .then(setData)
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Erro desconhecido'
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
