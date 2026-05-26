import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { applyThemeTokens } from './constants/themeTokens'
import { DEFAULT_SETTINGS } from './types/settings'
import './index.css'

applyThemeTokens(DEFAULT_SETTINGS.theme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
