import { createContext, useContext, useState, type ReactNode } from 'react'

export type AppMode = 'delivery' | 'wholesale'

interface ModeContextType {
  mode: AppMode | null
  setMode: (mode: AppMode) => void
  clearMode: () => void
  isDelivery: boolean
  isWholesale: boolean
}

const STORAGE_KEY = 'wct-mode'

const ModeContext = createContext<ModeContextType | null>(null)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'delivery' || stored === 'wholesale' ? stored : null
  })

  const setMode = (newMode: AppMode) => {
    setModeState(newMode)
    localStorage.setItem(STORAGE_KEY, newMode)
  }

  const clearMode = () => {
    setModeState(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <ModeContext.Provider value={{ mode, setMode, clearMode, isDelivery: mode === 'delivery', isWholesale: mode === 'wholesale' }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (!context) throw new Error('useMode must be used within a ModeProvider')
  return context
}
