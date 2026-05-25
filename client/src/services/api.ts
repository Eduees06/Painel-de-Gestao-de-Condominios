import { Condominium } from '../types/condominium'

export async function fetchCondominiums(): Promise<Condominium[]> {
  const response = await fetch('/api/condominiums')

  if (!response.ok) {
    throw new Error('Erro ao buscar condomínios')
  }

  return response.json()
}
