import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  Settings,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react'
import { MODULE_UNAVAILABLE_MESSAGE } from '../constants/messages'
import { useSettingsContext } from '../context/SettingsContext'
import { AppView } from '../types/settings'
import { getInitials } from '../utils/initials'

interface NavItem {
  icon: typeof Building2
  label: string
  view?: AppView
  disabled?: boolean
}

const navItems: NavItem[] = [
  { icon: Building2, label: 'Condomínios', view: 'condominiums' },
  { icon: Users, label: 'Moradores', disabled: true },
  { icon: Wallet, label: 'Financeiro', disabled: true },
  { icon: Wrench, label: 'Manutenção', disabled: true },
  { icon: BarChart3, label: 'Relatórios', disabled: true },
  { icon: Settings, label: 'Configurações', view: 'settings' },
]

interface SidebarProps {
  currentView: AppView
  onNavigate: (view: AppView) => void
  onModuleUnavailable: (message: string) => void
}

export function Sidebar({
  currentView,
  onNavigate,
  onModuleUnavailable,
}: SidebarProps) {
  const { settings, toggleSidebar } = useSettingsContext()
  const collapsed = settings.sidebarCollapsed
  const initials = getInitials(settings.userName)

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <Building2 size={22} className="sidebar-logo-icon" />
          {!collapsed && <span>Painel Condomínios</span>}
        </div>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="sidebar-profile">
        <div className="sidebar-avatar">{initials}</div>
        {!collapsed && (
          <div className="sidebar-profile-text">
            <p className="sidebar-user-name">{settings.userName}</p>
            <p className="sidebar-user-role">Gestão</p>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ icon: Icon, label, view, disabled }) => {
          const active = view != null && currentView === view
          return (
            <button
              key={label}
              type="button"
              className={`sidebar-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
              title={collapsed ? label : undefined}
              onClick={() => {
                if (disabled) {
                  onModuleUnavailable(MODULE_UNAVAILABLE_MESSAGE)
                  return
                }
                if (view) onNavigate(view)
              }}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </button>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <span>v1.0.0</span>
        </div>
      )}
    </aside>
  )
}
