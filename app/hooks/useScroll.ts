'use client'

import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [isUtilityBarVisible, setIsUtilityBarVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingUp = currentScrollY < scrollY
      
      setIsUtilityBarVisible(scrollingUp || currentScrollY < 50)
      setScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  return {
    isUtilityBarVisible
  }
}

