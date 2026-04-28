import { useState, useEffect } from 'react'
import heroImage from '../assets/hero-bg.png'
import ContactCta from '../components/ContactCta.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import MediaFrame from '../components/MediaFrame.jsx'
import NotchedButton from '../components/NotchedButton.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import TextReveal from '../components/TextReveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import {
  techLabels,
  faqItems,
  getProjectsBySlugs,
  homeFeaturedSlugs,
  services,
  siteIdentity,
  socialLinks,
  workProcess,
} from '../data/siteData.js'

const API_URL = 'http://localhost:5000/api/projects'

function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        
        if (data && data.length > 0) {
          // Transform API response to match ProjectCard format
          const transformed = data.slice(0, 4).map((project, index) => ({
            slug: project._id,
            heroImage: project.image,
            title: project.title,
            category: project.category?.toUpperCase() || 'PROJECT',
            description: project.description || '',
          }))
          setFeaturedProjects(transformed)
        } else {
          // Fallback to hardcoded projects
          setFeaturedProjects(getProjectsBySlugs(homeFeaturedSlugs).map((project, index) => ({
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
        // Fallback to hardcoded projects on error
        setFeaturedProjects(getProjectsBySlugs(homeFeaturedSlugs).map((project, index) => ({
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
      <div className="homepage-hero-wrapper">
        <section className="hero-text-section" id="top">
          <Reveal className="hero-badge">
            <span className="status-dot" />
            AVAILABLE FOR FREELANCE
          </Reveal>

          <div className="hero-title-container">
            <TextReveal
              elementType="h1"
              className="hero-title"
              text="Kishan Malviya"
              split="word"
              delay={0.1}
              staggerDuration={0.06}
            />
          </div>

          <Reveal className="hero-footer" delay={0.2}>
            <div className="hero-location">BASED IN AHEMDABAD, INDIA</div>
            <div className="hero-roles">///Cinematic Video Editor</div>
          </Reveal>
        </section>

        <section className="hero-image-section">
          <Reveal id="image-1" delay={0.3}>
            <img
              alt="Hero portrait"
              className="hero-image-full"
              src={heroImage}
            />
          </Reveal>
        </section>

        <div className="about-transition-wrapper">
          <div className="about-transition-container">
            <section className="split-copy" id="about">
              <div className="flex flex-col gap-2">
                <p className="eyebrow">ABOUT KISHAN</p>
                <TextReveal
                  elementType="h2"
                  className="display-title display-title--compact manifesto__title"
                  text="I am a cinematic video editor."
                  split="word"
                  staggerDuration={0.05}
                />
              </div>
              <Reveal className="split-copy__aside" delay={0.1}>
                <p className="eyebrow">Editing Style &amp; Approach</p>
                <p className="section-description">
                  I craft cinematic edits, reels, and social media videos with strong storytelling, smooth transitions, and high-quality visual impact.
                </p>
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      <section className="logo-marquee">
        <div className="logo-marquee__track">
          {[...techLabels, ...techLabels].map((label, index) => (
            <div className="logo-marquee__item" key={`${label}-${index}`}>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle
          action={<NotchedButton to="/work">View All Projects*</NotchedButton>}
          description="I create cinematic edits, reels, and storytelling-driven videos that capture attention and deliver impact."
          eyebrow="FEATURED WORK"
          title="Featured work"
        />
        <div className="project-grid project-grid--featured">
          {!loading && featuredProjects && featuredProjects.map((project, index) => (
            <ProjectCard
              delay={index * 0.08}
              key={project.slug}
              project={project}
              tall={index === 1 || index === 2}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle
          action={<NotchedButton to="/work">Explore More*</NotchedButton>}
          eyebrow="MY EDITING WORKFLOW"
          title="CINEMATIC EDITING PROCESS BUILT FOR HIGH-IMPACT STORYTELLING"
        />
        <div className="process-grid">
          {workProcess.map((group, index) => (
            <Reveal className="process-card" delay={index * 0.08} key={group.phase}>
              <p className="process-card__phase">{group.phase}</p>
              <ul>
                {group.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle
          action={<NotchedButton to="/contact">Explore More*</NotchedButton>}
          description="Specialized in cinematic video editing, color grading, and storytelling for creators, brands, and social media."
          eyebrow="my services"
          title="CINEMATIC VIDEO EDITING SERVICES FOR HIGH-IMPACT CONTENT"
        />
        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal className="service-card" delay={index * 0.08} key={service.title}>
              <div className="service-card__media">
                <img alt={service.title} src={service.image} />
              </div>
              <div className="service-card__copy">
                <p className="eyebrow">{service.number}</p>
                <h3>{service.title}</h3>
                <p>{service.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <Reveal className="manifesto__copy">
          <p className="section-description">
            I specialize in cinematic video editing, color grading, and storytelling for creators and brands.
          </p>
        </Reveal>
        <div className="relative pt-8">
          <TextReveal
            elementType="p"
            className="manifesto__title"
            text="I TURN RAW FOOTAGE INTO HIGH-IMPACT CINEMATIC STORIES."
            split="word"
            staggerDuration={0.08}
          />
        </div>
      </section>

      <Reveal>
        <MediaFrame
          alt="Neon portrait"
          className="feature-band"
          src="https://framerusercontent.com/images/Ivx27uxA9ATX9S1HJ3xeeJWVp8.png"
        />
      </Reveal>

      <section className="voice-grid">
        <Reveal className="flex flex-col gap-4">
          <p className="eyebrow">CINEMATIC VIDEO EDITOR</p>
          <TextReveal
            elementType="h2"
            className="section-heading"
            text="FOR BRANDS THAT WANT ATTENTION. FOR CREATORS WHO WANT IMPACT."
            split="word"
            staggerDuration={0.05}
          />
          <p className="voice-grid__code pt-4">NETWORK / LINKS</p>
          <div className="voice-grid__links">
            {socialLinks.map((link, index) => (
              <span key={link.label}>
                <a href={link.href} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
                {index < socialLinks.length - 1 && <span className="opacity-30 mx-2">/</span>}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <MediaFrame
            alt="Voice portrait"
            className="voice-grid__media"
            src="https://framerusercontent.com/images/P8WIsZWKKcq6h43PdNwBEQGPmk.png"
          />
        </Reveal>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="SERVICES"
          title="WHAT I CAN DO FOR YOU"
        />
        <div className="process-grid">
          {[
            { title: 'Reel Editing', description: 'Scroll-stopping short-form edits optimized for Instagram and TikTok.' },
            { title: 'YouTube Editing', description: 'Engaging long-form edits with pacing, cuts, and retention hooks.' },
            { title: 'Color Grading', description: 'Cinematic color correction that sets the mood and elevates your footage.' },
            { title: 'Sound Design', description: 'Precise audio mixing, SFX layering, and music sync for immersive videos.' },
            { title: 'Motion Graphics', description: 'Clean titles, lower thirds, and animated elements to polish your content.' },
            { title: 'Fast Delivery', description: 'Quick turnaround without compromising on quality or attention to detail.' },
          ].map((item, index) => (
            <Reveal className="process-card" delay={index * 0.08} key={item.title}>
              <p className="process-card__phase">{item.title}</p>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <MediaFrame
          alt="Atmospheric portrait"
          className="feature-band"
          src="https://framerusercontent.com/images/dhgiGPKGanFp6zw3uyGKBNz0.png"
        />
      </Reveal>

      <section className="section">
        <SectionTitle
          eyebrow="READY TO START?"
          title="LET'S WORK TOGETHER"
          description="Have a project in mind? Let's create something cinematic and impactful."
        />
        <Reveal className="process-grid" style={{ maxWidth: 640 }}>
          <div className="process-card">
            <ul>
              <li>Custom pricing based on your project</li>
              <li>Fast turnaround &amp; revisions</li>
              <li>Professional communication</li>
            </ul>
            <NotchedButton to="/contact" variant="light">GET IN TOUCH →</NotchedButton>
          </div>
        </Reveal>
      </section>

      <section className="section" id="faq">
        <SectionTitle eyebrow="Frequently Asked Questions" title="HAVE QUESTIONS BEFORE WE START?" />
        <FAQAccordion items={faqItems} />
      </section>

      <ContactCta />
    </>
  )
}

export default HomePage
