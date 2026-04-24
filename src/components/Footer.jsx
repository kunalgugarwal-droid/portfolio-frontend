import { Link } from 'react-router-dom'
import { siteIdentity } from '../data/siteData.js'
import Reveal from './Reveal.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <Reveal>
        <p className="footer-word">{siteIdentity.footerWord}</p>
      </Reveal>
      <div className="site-footer__bar">
        <Link to="/#top">Go Back To Top</Link>
      </div>
    </footer>
  )
}

export default Footer
