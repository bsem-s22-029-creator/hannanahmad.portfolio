import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../App.jsx'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav" aria-label="Main navigation">
        <div className="nav-brand">
          <span className="brand-text">Hannan Ahmad</span>
        </div>
        
        <div id="nav-menu" className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('projects')}
              >
                Projects
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('experience')}
              >
                Experience
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <span className="theme-icon">☀️</span>
            ) : (
              <span className="theme-icon">🌙</span>
            )}
          </button>
        </div>

        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          role="button"
          tabIndex={0}
          aria-expanded={isMobileMenuOpen}
          aria-controls="nav-menu"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsMobileMenuOpen(!isMobileMenuOpen) }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  )
}

export default Header
