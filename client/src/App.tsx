import { useState } from 'react'
import { ErrorState } from './components/ErrorState'
import { LoadingState } from './components/LoadingState'
import { Sidebar } from './components/Sidebar'
import { Toast } from './components/Toast'
import { Topbar } from './components/Topbar'
import { SettingsProvider } from './context/SettingsContext'
import { MODULE_UNAVAILABLE_MESSAGE } from './constants/messages'
import { useCondominiums } from './hooks/useCondominiums'
import { useToast } from './hooks/useToast'
import { AppView } from './types/settings'
import { CondominiumsView } from './views/CondominiumsView'
import { SettingsView } from './views/SettingsView'

function AppShell() {
  const { data, loading, error } = useCondominiums()
  const [view, setView] = useState<AppView>('condominiums')
  const { toast, closing: toastClosing, showToast, closeToast } = useToast()

  function showModuleUnavailable(message = MODULE_UNAVAILABLE_MESSAGE) {
    showToast(message)
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
          {toast && (
            <Toast
              message={toast}
              closing={toastClosing}
              onClose={closeToast}
            />
          )}

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
