import { useEffect, useState } from 'react'
import { THEME_OPTIONS } from '../constants/themes'
import { useSettingsContext } from '../context/SettingsContext'
import { ThemeId } from '../types/settings'

export function SettingsView() {
  const { settings, saveUserName, setTheme } = useSettingsContext()
  const [draftName, setDraftName] = useState(settings.userName)
  const [savedHint, setSavedHint] = useState(false)

  useEffect(() => {
    setDraftName(settings.userName)
  }, [settings.userName])

  function handleSave() {
    saveUserName(draftName)
    setSavedHint(true)
    window.setTimeout(() => setSavedHint(false), 2500)
  }

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
            value={draftName}
            maxLength={48}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <p className="settings-hint">
          O nome na barra lateral só muda após salvar. Iniciais geradas
          automaticamente.
        </p>
        <button type="button" className="btn-primary" onClick={handleSave}>
          Salvar
        </button>
        {savedHint && <p className="settings-saved">Nome atualizado.</p>}
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
          <li>Tema aplicado ao selecionar; nome ao clicar em Salvar</li>
          <li>Configurações salvas neste navegador</li>
        </ul>
      </section>
    </div>
  )
}
