import { THEME_OPTIONS } from '../constants/themes'
import { useSettingsContext } from '../context/SettingsContext'
import { ThemeId } from '../types/settings'

export function SettingsView() {
  const { settings, setUserName, setTheme } = useSettingsContext()

  return (
    <div className="settings-view">
      <header className="settings-header">
        <h2>Configurações</h2>
        <p>Personalize seu perfil e a aparência do painel.</p>
      </header>

      <section className="settings-card">
        <h3>Perfil</h3>
        <label className="settings-field">
          Nome exibido
          <input
            type="text"
            className="settings-input"
            value={settings.userName}
            maxLength={48}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <p className="settings-hint">
          O nome aparece na barra lateral. Iniciais geradas automaticamente.
        </p>
      </section>

      <section className="settings-card">
        <h3>Tema da página</h3>
        <div className="theme-options">
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={`theme-option ${settings.theme === theme.id ? 'theme-option--active' : ''}`}
              onClick={() => setTheme(theme.id as ThemeId)}
            >
              <span
                className={`theme-swatch theme-swatch--${theme.id}`}
                aria-hidden
              />
              <span className="theme-option-text">
                <strong>{theme.label}</strong>
                <small>{theme.description}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="settings-card">
        <h3>Preferências</h3>
        <ul className="settings-list">
          <li>Menu lateral retrátil pelo ícone na barra</li>
          <li>Ordenação pela tabela ou pelos filtros acima da lista</li>
          <li>Configurações salvas automaticamente neste navegador</li>
        </ul>
      </section>
    </div>
  )
}
