import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthenticationProvider from './context/AuthenticationContext.jsx'
import SecretsProvider from './context/SecretsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthenticationProvider>
      <SecretsProvider>
        <App />
      </SecretsProvider>
    </AuthenticationProvider>
  // </React.StrictMode>,
)
