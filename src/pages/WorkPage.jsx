import PageHero from '../components/PageHero.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/siteData.js'

function WorkPage() {
  return (
    <>
      <PageHero
        description="My creative spirit comes alive in the digital realm. With nimble fingers flying across the keyboard, I craft clear experiences out of nothing but ones and zeroes."
        eyebrow="(2021 - 2024)"
        title="Selected works"
      />
      <section className="section">
        <div className="project-grid project-grid--archive">
          {projects.map((project, index) => (
            <ProjectCard delay={index * 0.05} key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}

export default WorkPage
