import { useEffect, useState } from 'react'
import { ErrorState } from './components/ErrorState'
import { LoadingState } from './components/LoadingState'
import { Sidebar } from './components/Sidebar'
import { Toast } from './components/Toast'
import { Topbar } from './components/Topbar'
import { SettingsProvider } from './context/SettingsContext'
import { MODULE_UNAVAILABLE_MESSAGE } from './constants/messages'
import { useCondominiums } from './hooks/useCondominiums'
import { AppView } from './types/settings'
import { CondominiumsView } from './views/CondominiumsView'
import { SettingsView } from './views/SettingsView'

function AppShell() {
  const { data, loading, error } = useCondominiums()
  const [view, setView] = useState<AppView>('condominiums')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(id)
  }, [toast])

  function showModuleUnavailable(message = MODULE_UNAVAILABLE_MESSAGE) {
    setToast(message)
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentView={view}
        onNavigate={setView}
        onModuleUnavailable={showModuleUnavailable}
      />
      <div className="main-wrapper">
        <Topbar view={view} />
        <main className="main-content">
          {toast && <Toast message={toast} onClose={() => setToast(null)} />}

          {view === 'settings' && <SettingsView />}

          {view === 'condominiums' && (
            <>
              {loading && <LoadingState />}
              {error && <ErrorState message={error} />}
              {!loading && !error && <CondominiumsView data={data} />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  )
}

export default App
