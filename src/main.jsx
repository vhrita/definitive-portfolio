import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './index.css'

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
    <Home />
  </React.StrictMode>,
)
