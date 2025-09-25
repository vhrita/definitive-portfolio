import { useState, useEffect } from 'react'

const useIsMobile = (breakpoint = 768) => {
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.innerWidth <= breakpoint
  }

  const [isMobile, setIsMobile] = useState(getInitialState)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [breakpoint])

  return isMobile
}

export default useIsMobile
