import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/manrope'
import '@fontsource-variable/noto-sans-arabic'
import '@fontsource-variable/noto-kufi-arabic'
import App from './App'
import { I18nProvider } from './i18n'
import './styles.css'
import './reference-sections.css'
import './banknote-art.css'
import './i18n.css'
import './motion.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider><App /></I18nProvider>
  </StrictMode>,
)
