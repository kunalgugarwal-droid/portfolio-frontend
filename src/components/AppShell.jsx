import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getProjectBySlug } from '../data/siteData.js'
import CustomCursor from './CustomCursor.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

const MotionMain = motion.main

function getPageTitle(pathname) {
  if (pathname === '/') {
    return 'Dune - Portfolio & Creative Agency'
  }

  if (pathname === '/about') {
    return 'About - Dune Creative Agency'
  }

  if (pathname === '/work') {
    return 'Selected Works - Dune Creative Agency'
  }

  if (pathname === '/contact') {
    return 'Contact - Dune Creative Agency'
  }

  if (pathname.startsWith('/work/')) {
    const project = getProjectBySlug(pathname.replace('/work/', ''))
    if (project) {
      return `${project.title} - Dune Creative Agency`
    }
  }

  return 'Dune Creative Agency'
}

function AppShell() {
  const location = useLocation()

  useEffect(() => {
    document.title = getPageTitle(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(location.hash.slice(1))
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    window.scrollTo({ behavior: 'auto', left: 0, top: 0 })
  }, [location.hash, location.pathname])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <MotionMain
          animate={{ opacity: 1, y: 0 }}
          className="page-shell"
          exit={{ opacity: 0, y: 24 }}
          id="content"
          initial={{ opacity: 0, y: 24 }}
          key={location.pathname}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </MotionMain>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default AppShell
