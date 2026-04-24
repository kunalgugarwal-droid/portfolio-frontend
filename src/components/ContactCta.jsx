import { socialLinks } from '../data/siteData.js'
import MediaFrame from './MediaFrame.jsx'
import NotchedButton from './NotchedButton.jsx'
import RevealOnScroll from './RevealOnScroll.jsx'

function ContactCta() {
  return (
    <section className="contact-cta">
      <div className="contact-cta__grid">
        <RevealOnScroll className="contact-cta__copy">
          <p className="eyebrow">LET&apos;S CREATE SOMETHING CINEMATIC</p>
          <h2 className="display-title display-title--compact">
            Let&apos;s create
            <br />
            something cinematic
          </h2>
          <p className="hero-copy">
            I help creators and brands turn raw footage into cinematic, high-impact
            videos that capture attention and drive engagement.
            <br /><br />
            Based in India, working with clients worldwide.
            <br />
            Fast delivery. Clean edits. Powerful storytelling.
          </p>
          <div className="contact-cta__actions">
            <NotchedButton to="/contact">START A PROJECT*</NotchedButton>
            <div className="contact-cta__links">
              <span className="eyebrow" style={{ marginRight: 8 }}>CONNECT →</span>
              {socialLinks.map((link, index) => (
                <span key={link.label}>
                  <a href={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                  {index < socialLinks.length - 1 && <span className="opacity-30 mx-2">/</span>}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <MediaFrame
            alt="Cyberpunk portrait"
            className="contact-cta__media"
            src="https://framerusercontent.com/images/ufe8eepr2kNoeVcCs8KWPjP4UFo.png"
          />
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default ContactCta
