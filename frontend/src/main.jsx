import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import {Provider} from 'react-redux'
// import {store} from './services/configStore.jsx'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  
 
)
