import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MediaFrame from '../components/MediaFrame.jsx'
import NotchedButton from '../components/NotchedButton.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { getProjectBySlug, getProjectsBySlugs, projectNarrative } from '../data/siteData.js'
import NotFoundPage from './NotFoundPage.jsx'

const API_URL = 'https://kishan-portfolio-fullstack.onrender.com/api/projects'

function ProjectPage() {
  const { slug } = useParams()
  const [mongoProject, setMongoProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // First try local siteData
  const localProject = getProjectBySlug(slug)

  useEffect(() => {
    // If found in local data, no need to fetch from API
    if (localProject) {
      setLoading(false)
      return
    }

    // Try fetching from MongoDB
    const fetchMongoProject = async () => {
      try {
        const res = await fetch(`${API_URL}/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setMongoProject(data)
        } else {
          setError(true)
        }
      } catch (err) {
        setError(true)
      }
      setLoading(false)
    }

    fetchMongoProject()
  }, [slug, localProject])

  // Show local project if found
  if (localProject) {
    const relatedProjects = getProjectsBySlugs(localProject.related)

    return (
      <>
        <section className="project-header" id="top">
          <Reveal className="project-header__intro">
            <h1 className="project-header__title">{localProject.title}</h1>
            <p className="project-header__copy">{localProject.intro}</p>
          </Reveal>
          <Reveal className="project-header__meta" delay={0.1}>
            <div className="project-header__stat">
              <span>Client</span>
              <strong>{localProject.client}</strong>
            </div>
            <div className="project-header__stat">
              <span>Year</span>
              <strong>{localProject.year}</strong>
            </div>
            <div className="project-header__stat">
              <span>Category</span>
              <strong>{localProject.category}</strong>
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
          <MediaFrame alt={localProject.title} className="feature-band" src={localProject.heroImage} />
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
          <MediaFrame alt={`${localProject.title} concept`} className="feature-band" src={localProject.gallery[0]} />
        </Reveal>

        <section className="section section--narrow">
          <Reveal className="narrative-card">
            <h2>Problem</h2>
            <p>{projectNarrative.problem}</p>
          </Reveal>
        </section>

        <Reveal>
          <MediaFrame alt={`${localProject.title} problem`} className="feature-band" src={localProject.gallery[1]} />
        </Reveal>

        <section className="section section--narrow">
          <Reveal className="narrative-card">
            <h2>Solution</h2>
            <p>{projectNarrative.solution}</p>
          </Reveal>
        </section>

        <Reveal>
          <MediaFrame alt={`${localProject.title} solution`} className="feature-band" src={localProject.gallery[2]} />
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // MongoDB project found
  if (mongoProject) {
    return (
      <>
        <section className="project-header" id="top">
          <Reveal className="project-header__intro">
            <h1 className="project-header__title">{mongoProject.title}</h1>
            <p className="project-header__copy">{mongoProject.description || 'Project details'}</p>
          </Reveal>
          <Reveal className="project-header__meta" delay={0.1}>
            <div className="project-header__stat">
              <span>Category</span>
              <strong>{mongoProject.category}</strong>
            </div>
            {mongoProject.videoUrl && (
              <div className="project-header__stat">
                <span>Video</span>
                <NotchedButton href={mongoProject.videoUrl} target="_blank">
                  Watch Video
                </NotchedButton>
              </div>
            )}
          </Reveal>
        </section>

        <Reveal>
          <MediaFrame alt={mongoProject.title} className="feature-band" src={mongoProject.image} />
        </Reveal>

        {mongoProject.description && (
          <section className="section section--narrow">
            <Reveal className="narrative-card">
              <h2>About This Project</h2>
              <p>{mongoProject.description}</p>
            </Reveal>
          </section>
        )}
      </>
    )
  }

  // Not found
  if (error) {
    return <NotFoundPage />
  }

  return <NotFoundPage />
}

export default ProjectPage
