import './style.scss'

import React, { useState, useEffect } from 'react'

import LangSelector from '../LangSelector';

function Navbar({items}) {
    const [onTop, setOnTop] = useState(true);

    useEffect(() => {
        const onScroll = () => window.scrollY >= 75 ? setOnTop(false) : setOnTop(true)
        window.removeEventListener("scroll", onScroll)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const jumpTo = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }

    return (
      <nav className={onTop ? "" : "scrolled"}>
        <div>
          {items.map((item) => (
            <button key={item.id} onClick={() => jumpTo(item.id)}>{item.name}</button>
          ))}
          <LangSelector />
        </div>
      </nav>
    );
}

export default Navbar