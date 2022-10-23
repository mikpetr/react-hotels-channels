import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

import Switch from './Switch'

const isBrowserDefaultDark = (): boolean => {
  if (window && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)')?.matches
  }
  
  return false
}

export default function ThemeControl() {
  const [isDarkMode, setIsDarkMode]: [boolean, Function] = useState(isBrowserDefaultDark())

  const setDarkMode = (): void => {
    document.body?.parentElement?.classList?.add('dark')
  }
  const setLightMode = (): void => {
    document.body?.parentElement?.classList?.remove('dark')
  }

  useEffect((): void => {
    if (isDarkMode) {
      setDarkMode()
    }
  }, [])

  const onThemeChange = (isDarkMode: boolean): void => {
    if (isDarkMode) {
      setDarkMode()
    } else {
      setLightMode()
    }
    setIsDarkMode(isDarkMode)
  }

  return (
    <div className="flex text-slate-500 dark:text-slate-400">
      <div className="w-5 h-5 mr-2">
        <SunIcon />
      </div>
      <div>
        <Switch isSelected={isDarkMode} onChange={onThemeChange} aria-label="" />
      </div>
      <div className="w-5 h-5 ml-2">
        <MoonIcon />
      </div>
    </div>
  )
}
