import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importar BrowserRouter para el manejo entre mis paginas
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
