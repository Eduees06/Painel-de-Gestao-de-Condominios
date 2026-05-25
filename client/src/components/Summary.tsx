import { Condominium } from '../types/condominium'

const DATA_YEAR = 2023

interface SummaryProps {
  condominiums: Condominium[]
}

export function Summary({ condominiums }: SummaryProps) {
  const totalResidents = condominiums.reduce((sum, c) => sum + c.residents, 0)

  return (
    <section className="summary" aria-label="Resumo">
      <dl className="summary-stat">
        <dt>Condomínios</dt>
        <dd>{condominiums.length}</dd>
      </dl>
      <dl className="summary-stat">
        <dt>Moradores</dt>
        <dd>{totalResidents.toLocaleString('pt-BR')}</dd>
      </dl>
      <p className="summary-meta">
        Dados referentes ao ano de {DATA_YEAR}. Fonte: Census Bureau — ACS
        5-year Estimate
      </p>
    </section>
  )
}
