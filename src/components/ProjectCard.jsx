import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from './RevealOnScroll.jsx'

const MotionLink = motion(Link)

function ProjectCard({ delay = 0, project, tall = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <RevealOnScroll delay={delay}>
      <MotionLink
        className={['project-card', tall ? 'project-card--tall' : ''].join(' ')}
        onHoverEnd={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
        to={`/work/${project.slug}`}
        whileHover={{ y: -4, scale: 1.01 }}
      >
        <div className="project-card__image-wrap">
          <img alt={project.title} className="project-card__image" src={project.heroImage} />
          <div aria-hidden="true" className="project-card__tint" />
          <AnimatePresence>
            {hovered ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="project-card__pill"
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                VIEW
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="project-card__content">
          <p className="project-card__title">{project.title}</p>
          <p className="project-card__category">///{project.category}</p>
        </div>
      </MotionLink>
    </RevealOnScroll>
  )
}

export default ProjectCard
