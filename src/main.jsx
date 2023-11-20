import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import Navbar from './components/Navbar'
import Social from './components/Social'
import Home from './pages/Home'


const pages = [
  {
    id: "home",
    name: "Home",
  },
  {
    id: "about",
    name: "About",
  },
  {
    id: "portfolio",
    name: "Portfolio",
  },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar items={pages} />
    <Social />
    <Home />
  </React.StrictMode>,
)
