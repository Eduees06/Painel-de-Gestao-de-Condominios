import { AppView } from '../types/settings'

const TITLES: Record<AppView, { module: string; breadcrumb: string }> = {
  condominiums: {
    module: 'Condomínios',
    breadcrumb: 'Painel de Gestão',
  },
  settings: {
    module: 'Configurações',
    breadcrumb: 'Preferências do painel',
  },
}

interface TopbarProps {
  view: AppView
}

export function Topbar({ view }: TopbarProps) {
  const { module, breadcrumb } = TITLES[view]

  return (
    <header className="topbar">
      <div className="topbar-title">
        <span className="topbar-module">{module}</span>
        <span className="topbar-breadcrumb">{breadcrumb}</span>
      </div>
    </header>
  )
}
