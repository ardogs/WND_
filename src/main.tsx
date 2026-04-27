import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { router } from './routes/router'
import "./lib/i18n";
import "./main.scss"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
   </StrictMode>,
)
