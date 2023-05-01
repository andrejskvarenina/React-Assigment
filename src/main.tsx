import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { PageContextProvider } from './context/page-context.tsx'
import { FilteredCharactersProvider } from './context/filtered-characters-context.tsx'
import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
        <QueryClientProvider client={client}>
          <PageContextProvider>
            <FilteredCharactersProvider>
              <App />
            </FilteredCharactersProvider>
          </PageContextProvider>
        </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
