import { useEffect, useRef, useState } from 'react'

// Load all assets in the folder and expose as URLs (works with any extension)
// as option deprecated → use query/import
const assetUrls = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' })

const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '')

const basename = (p) => {
  const parts = p.split('/')
  return parts[parts.length - 1]
}

const assetsIndex = Object.keys(assetUrls).map((path) => {
  const file = basename(path)
  const nameOnly = file.substring(0, file.lastIndexOf('.'))
  return { name: nameOnly, norm: normalize(nameOnly), url: assetUrls[path] }
})

// Preferred mapping from project keywords → specific asset basenames
const preferredMap = [
  { key: 'edux', assetBase: 'edux-screenshot' },
  { key: 'construction ai', assetBase: 'construction-ai-image' },
  { key: 'barakah vault', assetBase: 'barakah-screenshot' },
  { key: 'econcruise', assetBase: 'econcruise-image' },
  { key: 'listing for business', assetBase: 'listing-for-business-image' },
  { key: 'bloggify', assetBase: 'bloggify-image' }
]

const resolveProjectImage = (title) => {
  const tnorm = normalize(title)
  // 1) preferred explicit mapping
  for (const { key, assetBase } of preferredMap) {
    if (tnorm.includes(normalize(key))) {
      const hit = assetsIndex.find((a) => a.norm.includes(normalize(assetBase)))
      if (hit) return hit.url
    }
  }
  // 2) generic contains match (fallback)
  const hit = assetsIndex.find((a) => tnorm.includes(a.norm))
  return hit ? hit.url : null
}

const Projects = () => {
  const projectsRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'EduX - Smart Learning, Smarter Connections',
      description: 'A full-featured Edux Learning Platform built with Laravel and React, featuring secure user authentication, interactive course management, student progress tracking, and a powerful admin dashboard for managing users, courses, and analytics.',
      image: null,
      technologies: ['Laravel', 'MySQL', 'Twilio', 'React.js', 'Javascript', 'Swagger'],
      category: 'web',
      liveUrl: 'https://github.com/HananAhmad772/edux-react',
      githubUrl: 'https://github.com/HananAhmad772/Edux-laravel',
      featured: true
    },
    {
      id: 2,
      title: 'Construction AI - Construction Management System',
      description: 'Built an advanced, real-time collaborative task management system, granular role-based access, automated approval workflows, comprehensive progress tracking, and enhanced team collaboration and accountability.',
      image: null,
      technologies: ['Laravel', 'MYSQL', 'REST APIs', 'Redis', 'Swagger','Dashboard', 'PHP'],
      category: 'dashboard',
      liveUrl: '#',
      githubUrl: 'https://github.com/HananAhmad772',
      featured: true
    },
    {
      id: 3,
      title: 'Barakah Vault - Islamic Investment Platform',
      description: 'A scalable, user-friendly Islamic investing platform offering multi-role access, secure Shariah-compliant investment workflows, admin approvals, robust bank-integrated transaction handling, and comprehensive portfolio performance tracking.',
      image: null,
      technologies: ['Laravel', 'API Resources', 'MYSQL', 'Postman','PHP'],
      category: 'web',
      liveUrl: 'https://barakahvault.com/',
      githubUrl: 'https://github.com/TecjauntOfficial/amazon_jv',
      featured: true
    },
    {
      id: 4,
      title: 'EconCruise - Restful APIs',
      description: 'A secure loan management backend and admin dashboard providing APIs for a mobile application, enabling borrowers to request funds and lenders to finance them, with automated late-fee rules, default handling workflows, and comprehensive loan lifecycle.',
      image: null,
      technologies: ['Laravel', 'MySQL', 'Postman', 'PHP', 'Stripe APIs', 'Dashboard'],
      category: 'api',
      liveUrl: '#',
      githubUrl: 'https://github.com/HananAhmad772',
      featured: true
    },
    {
      id: 5,
      title: 'Listing For Business',
      description: 'A business listing and marketing platform with a real-time analytics dashboard, featuring data visualization, detailed reporting, and export capabilities to help businesses track and optimize their marketing performance',
      image: null,
      technologies: ['Laravel', 'Blade', 'Livewire', 'MySQL', 'PHP','Full Stack'],
      category: 'web',
      liveUrl: 'https://github.com/HananAhmad772/listing-for-building-front-',
      githubUrl: 'https://github.com/HananAhmad772/listing-for-building',
      featured: true
    },
    {
      id: 6,
      title: 'Bloggify - Blogging Platform',
      description: 'Bloggifyy is an AI-powered blogging platform where users can create and publish blogs seamlessly. While writing or editing, the built-in AI suggests improvements for grammar, tone, and content quality to help users produce their best posts.',
      image: null,
      technologies: ['Laravel', 'Docker', 'Kubernetes', 'Redis', 'Nginx'],
      category: 'web',
      liveUrl: 'https://github.com/HananAhmad772/Bloggify-frontend',
      githubUrl: 'https://github.com/HananAhmad772/Bloggify',
      featured: true
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Applications' },
    { key: 'api', label: 'APIs' },
    { key: 'dashboard', label: 'Dashboards' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>

        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-image">
                {resolveProjectImage(project.title) ? (
                  <img 
                    src={resolveProjectImage(project.title)} 
                    alt={`${project.title} screenshot`} 
                    className="project-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="project-placeholder">
                    <span className="project-placeholder-text">[Project Screenshot]</span>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-actions">
                    <a 
                      href={project.liveUrl} 
                      className="project-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={project.githubUrl} 
                      className="project-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <p>Want to see more of my work?</p>
          <a 
            href="https://github.com/HananAhmad772" 
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
