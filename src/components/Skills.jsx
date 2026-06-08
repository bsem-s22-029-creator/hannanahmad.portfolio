import { useEffect, useRef, useState } from 'react'

const Skills = () => {
  const skillsRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('backend')
  const [barsVisible, setBarsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBarsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skillCategories = {
    backend: {
      title: 'Backend Technologies',
      skills: [
        { name: 'Laravel', level: 95, icon: '🐘' },
        { name: 'PHP', level: 90, icon: '⚡' },
        { name: 'MySQL', level: 90, icon: '🗄️' },
        { name: 'Redis', level: 75, icon: '🔴' },
        { name: 'API Development', level: 90, icon: '🔌' },
       
        // {name: 'Nginx', level: 75, icon: '🌐' },
        // {name: 'Composer', level: 90, icon: '🎼' },
      ]
    },
    frontend: {
      title: 'Frontend Technologies',
      skills: [
        { name: 'React.js', level: 85, icon: '⚛️' },
        { name: 'Blade', level: 80, icon: '🔒' },
        { name: 'JavaScript', level: 88, icon: '🟨' },
        { name: 'TypeScript', level: 75, icon: '🔷' },
        {name: 'Livewire', level: 80, icon: '🔒' },
        { name: 'HTML5', level: 95, icon: '🌐' },
        { name: 'CSS3', level: 90, icon: '🎨' },
        { name: 'Tailwind CSS', level: 85, icon: '🎯' },
        { name: 'Bootstrap', level: 80, icon: '📱' }
      ]
    },
    development: {
      title: 'Development',
      skills: [
        { name: 'RESTful APIs', level: 88, icon: '🌐' },
        { name: 'MVC Architecture', level: 80, icon: '🐘' },
        { name: 'Microservices', level: 88, icon: '🟨' },
        {name: 'Object Oriented Programming', level: 80, icon: '🔒' },
        {name: 'clean code', level: 80, icon: '🔒' },
      ]
    },
    tools: {
      title: 'Tools',
      skills: [
        { name: 'Git', level: 90, icon: '📦' },
        { name: 'Docker', level: 75, icon: '🐳' },
        {name: 'Apache', level: 80, icon: '🌐' },
        {name: 'Agile/Scrum', level: 80, icon: '🔒' },
        // { name: 'AWS', level: 70, icon: '☁️' },
        // { name: 'Linux', level: 80, icon: '🐧' },
        { name: 'Nginx', level: 75, icon: '🌐' },
        { name: 'Composer', level: 90, icon: '🎼' },
        { name: 'NPM', level: 85, icon: '📦' },
        { name: 'Webpack', level: 70, icon: '📦' },
        {name: 'Postman/Swagger', level: 80, icon: '📦' },
      ]
    }
  }

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-content">
          <div className="skills-categories">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {skillCategories[category].title}
              </button>
            ))}
          </div>

          <div className="skills-grid">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div key={index} className={`skill-item ${barsVisible ? 'animate' : ''}`}>
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: barsVisible ? `${skill.level}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-summary">
          <div className="summary-item">
            <h4>Backend Expertise</h4>
            <p>Laravel, PHP, Database Design, Redis, API Development</p>
          </div>
          <div className="summary-item">
            <h4>Frontend Skills</h4>
            <p>React, Modern JavaScript,Blade, Livewire, Responsive Design</p>
          </div>
          <div className="summary-item">
            <h4>DevOps & Tools</h4>
            <p>Git, Docker, AWS, Swagger/Postman, Composer</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
