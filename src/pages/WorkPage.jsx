import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { getProjectsBySlugs, homeFeaturedSlugs } from '../data/siteData.js'

const API_URL = 'https://kishan-portfolio-fullstack.onrender.com/api/projects'

function WorkPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()

        if (data && data.length > 0) {
          // Transform MongoDB projects to match ProjectCard format
          const transformed = data.map((project) => ({
            slug: project._id, // Use _id as slug for routing
            heroImage: project.image,
            title: project.title,
            category: project.category?.toUpperCase() || 'PROJECT',
            description: project.description || '',
          }))
          setProjects(transformed)
        } else {
          // Fallback to homepage featured projects
          setProjects(getProjectsBySlugs(homeFeaturedSlugs).map((project, index) => ({
            ...project,
            title: [
              'CINEMATIC EDIT',
              'INSTAGRAM REEL',
              'YOUTUBE VIDEO',
              'CLIENT PROJECT',
            ][index] ?? project.title,
            category: [
              'VIDEO EDITING',
              'REEL EDIT',
              'CONTENT EDIT',
              'VIDEO EDITING',
            ][index] ?? project.category,
          })))
        }
      } catch (err) {
        // Fallback to homepage featured projects on error
        setProjects(getProjectsBySlugs(homeFeaturedSlugs).map((project, index) => ({
          ...project,
          title: [
            'CINEMATIC EDIT',
            'INSTAGRAM REEL',
            'YOUTUBE VIDEO',
            'CLIENT PROJECT',
          ][index] ?? project.title,
          category: [
            'VIDEO EDITING',
            'REEL EDIT',
            'CONTENT EDIT',
            'VIDEO EDITING',
          ][index] ?? project.category,
        })))
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <>
      <PageHero
        description="My creative spirit comes alive in the digital realm. With nimble fingers flying across the keyboard, I craft clear experiences out of nothing but ones and zeroes."
        eyebrow="(2021 - 2024)"
        title="Selected works"
      />
      <section className="section">
        <div className="project-grid project-grid--archive">
          {!loading && projects.map((project, index) => (
            <ProjectCard delay={index * 0.05} key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}

export default WorkPage
