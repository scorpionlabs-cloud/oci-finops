import { ReactNode } from 'react'
import './Layout.css'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="layout-logo">OCI FinOps Dashboard</div>
        <div className="layout-actions">
          <ThemeToggle />
        </div>
        <div className="layout-subtitle">
          Cost &amp; Usage Insights for Oracle Cloud Infrastructure
        </div>
      </header>
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">
        Built with React · Mock data + CSV Upload · GitHub Pages ready · Dark/Light theme
      </footer>
    </div>
  )
}
