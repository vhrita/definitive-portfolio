import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import AppRouter from './components/Router';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  </React.StrictMode>
);
