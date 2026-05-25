import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface SummaryFlipCardProps {
  icon: LucideIcon
  label: string
  value: ReactNode
  backContent: ReactNode
}

export function SummaryFlipCard({
  icon: Icon,
  label,
  value,
  backContent,
}: SummaryFlipCardProps) {
  return (
    <div className="summary-flip">
      <div className="summary-flip-inner">
        <div className="summary-flip-face summary-flip-front">
          <Icon size={22} className="summary-card-icon" />
          <span className="summary-card-label">{label}</span>
          <span className="summary-card-value">{value}</span>
        </div>
        <div className="summary-flip-face summary-flip-back">{backContent}</div>
      </div>
    </div>
  )
}
