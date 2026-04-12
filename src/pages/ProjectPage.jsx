import { useParams } from 'react-router-dom'
import MediaFrame from '../components/MediaFrame.jsx'
import NotchedButton from '../components/NotchedButton.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { getProjectBySlug, getProjectsBySlugs, projectNarrative } from '../data/siteData.js'
import NotFoundPage from './NotFoundPage.jsx'

function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFoundPage />
  }

  const relatedProjects = getProjectsBySlugs(project.related)

  return (
    <>
      <section className="project-header" id="top">
        <Reveal className="project-header__intro">
          <h1 className="project-header__title">{project.title}</h1>
          <p className="project-header__copy">{project.intro}</p>
        </Reveal>
        <Reveal className="project-header__meta" delay={0.1}>
          <div className="project-header__stat">
            <span>Client</span>
            <strong>{project.client}</strong>
          </div>
          <div className="project-header__stat">
            <span>Year</span>
            <strong>{project.year}</strong>
          </div>
          <div className="project-header__stat">
            <span>Category</span>
            <strong>{project.category}</strong>
          </div>
          <div className="project-header__stat">
            <span>Live Project</span>
            <NotchedButton href="https://www.framer.com?via=westhill97" target="_blank">
              View Now
            </NotchedButton>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <MediaFrame alt={project.title} className="feature-band" src={project.heroImage} />
      </Reveal>

      <section className="section section--narrow">
        <div className="narrative-grid">
          <Reveal className="narrative-card">
            <h2>Concept</h2>
            <p>{projectNarrative.concept}</p>
          </Reveal>
          <Reveal className="narrative-card" delay={0.1}>
            <h2>Development</h2>
            <p>{projectNarrative.development}</p>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <MediaFrame alt={`${project.title} concept`} className="feature-band" src={project.gallery[0]} />
      </Reveal>

      <section className="section section--narrow">
        <Reveal className="narrative-card">
          <h2>Problem</h2>
          <p>{projectNarrative.problem}</p>
        </Reveal>
      </section>

      <Reveal>
        <MediaFrame alt={`${project.title} problem`} className="feature-band" src={project.gallery[1]} />
      </Reveal>

      <section className="section section--narrow">
        <Reveal className="narrative-card">
          <h2>Solution</h2>
          <p>{projectNarrative.solution}</p>
        </Reveal>
      </section>

      <Reveal>
        <MediaFrame alt={`${project.title} solution`} className="feature-band" src={project.gallery[2]} />
      </Reveal>

      <section className="section">
        <SectionTitle eyebrow="More Works" title="See also" />
        <div className="project-grid project-grid--related">
          {relatedProjects.map((item, index) => (
            <ProjectCard delay={index * 0.08} key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectPage
