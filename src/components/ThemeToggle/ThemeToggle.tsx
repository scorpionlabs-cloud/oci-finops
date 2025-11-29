import './ThemeToggle.css'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button className="theme-toggle" onClick={toggle}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
