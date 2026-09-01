import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter'
import StartPage from './StartPage'
import './start.css'
import './banknote-art.css'

createRoot(document.getElementById('root')).render(<StrictMode><StartPage /></StrictMode>)
