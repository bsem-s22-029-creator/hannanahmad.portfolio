import { useEffect, useRef } from 'react'

const Experience = () => {
  const experienceRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    if (experienceRef.current) {
      const items = experienceRef.current.querySelectorAll(
        '.timeline-item, .education-card, .stat-card'
      )
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      id: 1,
      title: 'Backend Developer',
      company: 'Tecjaunt',
      period: 'Apr 2025 - Present',
      type: 'Full-time',
      description: 'Leading backend development of Laravel applications, mentoring internees, and implementing best practices for scalable server-side solutions.',
      achievements: [
        'Delivered 500+ production-ready APIs for investment and loan apps.',
        'Improved business efficiency and customer satisfaction.',
        'Ensured seamless user experiences with scalable backend solutions.',
        'Led backend development using Laravel for secure, maintainable systems.'
      ],
      technologies: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Docker', 'Git']
    },
    {
      id: 2,
      title: 'Junior Laravel Developer',
      company: 'Trisage Solutions',
      period: 'Jan 2024 - Mar 2025',
      type: 'Full-time',
      description: 'Developed custom web applications for various clients, focusing on e-commerce solutions and content management systems.',
      achievements: [
        'Assisted senior developers on client projects',
        'Helped build features for investment platforms',
        'Reduced bug reports by 60%',
        'Implemented automated testing'
      ],
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe API', 'Bootstrap']
    },
    {
      id: 3,
      title: 'Internship Trainee',
      company: 'Xiist',
      period: 'Sep 2023 - Dec 2023',
      type: 'Part-time',
      description: 'Started my professional journey working on PHP-based web applications and learning Laravel framework.',
      achievements: [
        'Learn Laravel Framework',
        'Built first production application',
        'Learned modern PHP practices',
        'Contributed to open source projects'
      ],
      technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML/CSS','Wordpress', 'Blade','Livewire']
    }
  ]

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Software Engineering',
      institution: 'Superior University',
      year: '2019 - 2023',
      description: 'Focused on software engineering, database systems, and web development fundamentals.'
    },
    {
      id: 2,
      degree: 'FSc - Pre Engineering',
      institution: 'Cadet College Jhelum',
      year: '2017-19',
      description: 'Completed intermediate education with focus on Mathematics, Physics, and Chemistry, building strong analytical and problem-solving skills'
    },
    {
      id: 3,
      degree: 'Introduction to PHP',
      institution: 'Solo Learn',
      year: '10-Aug-2023',
      description: 'Learned the Basic Concepts of PHP, Frameworks and Technologies.'
    },
    {
      id: 3,
      degree: 'Introduction to MYSQL',
      institution: 'Solo Learn',
      year: '12-Dec-2023',
      description: 'Focus on learning the managment of Database Design and Database testing.'
    }

  ]

  return (
    <section id="experience" className="experience" ref={experienceRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>

        <div className="experience-content">
          <div className="experience-section">
            <h3 className="subsection-title">Work Experience</h3>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="timeline-title">{exp.title}</h4>
                      <span className="timeline-company">{exp.company}</span>
                      <span className="timeline-period">{exp.period}</span>
                      <span className="timeline-type">{exp.type}</span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                    <ul className="timeline-achievements">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                    <div className="timeline-technologies">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="experience-section">
            <h3 className="subsection-title">Education & Certifications</h3>
            <div className="education-grid">
              {education.map((edu) => (
                <div key={edu.id} className="education-card">
                  <div className="education-header">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <span className="education-institution">{edu.institution}</span>
                    <span className="education-year">{edu.year}</span>
                  </div>
                  <p className="education-description">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="experience-stats">
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-content">
              <h4>2+ Years</h4>
              <p>Professional Experience</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h4>10+ Projects</h4>
              <p>Successfully Ongoing and Delivered</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <h4>2 Certifications</h4>
              <p>Professional Certifications</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h4>100%</h4>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
