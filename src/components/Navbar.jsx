import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getProjectsBySlugs, homeFeaturedSlugs } from '../data/siteData.js'
import NotchedButton from './NotchedButton.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

const featuredMenuProjects = getProjectsBySlugs(homeFeaturedSlugs).map((project, index) => ({
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
}))
const MotionAside = motion.aside
const MotionDiv = motion.div

function formatTime() {
  return new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState(formatTime())

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="site-nav">
        <div className="site-nav__inner">
          <div className="site-nav__left">
            <Link className="site-nav__time" to="/">
              <span className="site-nav__muted">LOCAL/</span>
              <span>{time}</span>
            </Link>
            <Link aria-label="Contact" className="icon-chip" to="/contact">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.2 11.2 0 0 0 3.52.56 1.07 1.07 0 0 1 1.08 1.08V20a1.07 1.07 0 0 1-1.08 1.08A18.92 18.92 0 0 1 3 4.08 1.07 1.07 0 0 1 4.08 3h3.4a1.07 1.07 0 0 1 1.08 1.08 11.2 11.2 0 0 0 .56 3.52 1 1 0 0 1-.24 1Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
          <div className="site-nav__right">
            <Link aria-label="Browse work" className="icon-link" to="/work">
              <svg aria-hidden="true" viewBox="0 0 256 256">
                <path
                  d="M232.49 215.51 185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68A68.07 68.07 0 0 1 44 112Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <NotchedButton
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              className="site-nav__menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              Menu
            </NotchedButton>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <MotionAside
            animate={{ opacity: 1 }}
            className="menu-overlay"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <MotionDiv
              animate={{ opacity: 1, y: 0 }}
              className="menu-overlay__panel"
              exit={{ opacity: 0, y: 24 }}
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="menu-overlay__header">
                <p className="eyebrow">Navigation</p>
                <button
                  aria-label="Close navigation menu"
                  className="menu-overlay__close"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                >
                  Close
                </button>
              </div>
              <div className="menu-overlay__grid">
                <nav aria-label="Primary" className="menu-overlay__nav">
                  {navItems.map((item) => (
                    <NavLink
                      className={({ isActive }) =>
                        ['menu-overlay__link', isActive ? 'is-active' : '']
                          .filter(Boolean)
                          .join(' ')
                      }
                      key={item.to}
                      onClick={() => setMenuOpen(false)}
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="menu-overlay__meta">
                  <div>
                    <p className="eyebrow">Featured Work</p>
                    <div className="menu-overlay__projects">
                      {featuredMenuProjects.map((project) => (
                        <Link
                          key={project.slug}
                          onClick={() => setMenuOpen(false)}
                          to={`/work/${project.slug}`}
                        >
                          <span>{project.title}</span>
                          <small>///{project.category}</small>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow">Current Location</p>
                    <p className="menu-overlay__copy">
                      Ahmedabad, Gujarat
                      <br />
                      India
                    </p>
                  </div>
                </div>
                </div>
            </MotionDiv>
          </MotionAside>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navbar
