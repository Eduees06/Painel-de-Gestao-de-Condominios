import { Building2, Calendar, Users } from 'lucide-react'
import { DATA_META } from '../constants/dataMeta'
import { Condominium } from '../types/condominium'
import {
  averageResidents,
  countBySize,
  findLargest,
} from '../utils/condominiumInsights'
import { SummaryFlipCard } from './SummaryFlipCard'

interface SummaryProps {
  condominiums: Condominium[]
}

export function Summary({ condominiums }: SummaryProps) {
  const totalResidents = condominiums.reduce((sum, c) => sum + c.residents, 0)
  const bySize = countBySize(condominiums)
  const largest = findLargest(condominiums)
  const avg = averageResidents(condominiums, totalResidents)

  return (
    <section className="summary-section" aria-label="Resumo">
      <div className="summary-grid">
        <SummaryFlipCard
          icon={Building2}
          label="Total de condomínios"
          value={condominiums.length}
          backContent={
            <>
              <p className="summary-back-title">Distribuição por porte</p>
              <p>
                Pequeno: {bySize.Pequeno} · Médio: {bySize.Médio} · Grande:{' '}
                {bySize.Grande}
              </p>
              <p className="summary-back-hint">Passe o mouse para voltar</p>
            </>
          }
        />
        <SummaryFlipCard
          icon={Users}
          label="Total de moradores"
          value={totalResidents.toLocaleString('pt-BR')}
          backContent={
            <>
              <p className="summary-back-title">Destaques</p>
              <p>Média por condomínio: {avg.toLocaleString('pt-BR')}</p>
              {largest && (
                <p>
                  Maior: {largest.name} (
                  {largest.residents.toLocaleString('pt-BR')})
                </p>
              )}
            </>
          }
        />
        <SummaryFlipCard
          icon={Calendar}
          label="Ano de referência"
          value={DATA_META.year}
          backContent={
            <>
              <p className="summary-back-title">Sobre os dados</p>
              <p>
                Estimativa demográfica ACS (Census Bureau), mapeada para o
                painel de condomínios.
              </p>
              <p className="summary-back-hint">
                População por unidade · {DATA_META.year}
              </p>
            </>
          }
        />
      </div>
    </section>
  )
}
