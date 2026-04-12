import { socialLinks } from '../data/siteData.js'
import MediaFrame from './MediaFrame.jsx'
import NotchedButton from './NotchedButton.jsx'
import Reveal from './Reveal.jsx'

function ContactCta() {
  return (
    <section className="contact-cta">
      <div className="contact-cta__grid">
        <Reveal className="contact-cta__copy">
          <p className="eyebrow">Connect yourself into cyberpunk universe.</p>
          <h2 className="display-title display-title--compact">
            Let&apos;s work
            <br />
            together
          </h2>
          <p className="hero-copy">
            Based in Los Angeles, I am an innovative designer and digital artist. My
            passion for minimalist aesthetics, elegant typography, and intuitive design
            is evident in my work.
          </p>
          <div className="contact-cta__actions">
            <NotchedButton to="/contact">Contact Now*</NotchedButton>
            <div className="contact-cta__links">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <MediaFrame
            alt="Cyberpunk portrait"
            className="contact-cta__media"
            src="https://framerusercontent.com/images/ufe8eepr2kNoeVcCs8KWPjP4UFo.png"
          />
        </Reveal>
      </div>
    </section>
  )
}

export default ContactCta
