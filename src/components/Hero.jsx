import { useEffect, useRef } from 'react'
import heroImage from '../assets/Hero-image.png'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="greeting">Hello, I'm</span>
              <span className="name">Hannan Ahmad</span>
              <span className="title">Full Stack Developer</span>
            </h1>
            <p className="hero-description">
              Passionate Full Stack developer with expertise in building robust, 
              scalable web applications. I create elegant solutions that solve 
              real-world problems using modern PHP and Javascript frameworks and technologies.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={scrollToContact}
              >
                Get In Touch
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <div className="avatar-placeholder">
                <img src={heroImage} alt="Hero portrait" loading="lazy" />
              </div>
              <div className="hero-bg-elements">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">2+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}

export default Hero
