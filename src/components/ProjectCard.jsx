import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

function ProjectCard({ delay = 0, project, tall = false }) {
  return (
    <Reveal delay={delay}>
      <Link className={['project-card', tall ? 'project-card--tall' : ''].join(' ')} to={`/work/${project.slug}`}>
        <div className="project-card__image-wrap">
          <img alt={project.title} className="project-card__image" src={project.heroImage} />
          <div aria-hidden="true" className="project-card__tint" />
        </div>
        <div className="project-card__content">
          <p className="project-card__title">{project.title}</p>
          <p className="project-card__category">///{project.category}</p>
        </div>
      </Link>
    </Reveal>
  )
}

export default ProjectCard
