import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter'
import StartPage from './StartPage'
import { I18nProvider } from './i18n'
import './start.css'
import './banknote-art.css'
import './i18n.css'

createRoot(document.getElementById('root')).render(<StrictMode><I18nProvider><StartPage /></I18nProvider></StrictMode>)
