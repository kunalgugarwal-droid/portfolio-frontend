import { useState } from 'react'
import MediaFrame from '../components/MediaFrame.jsx'
import NotchedButton from '../components/NotchedButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { socialLinks } from '../data/siteData.js'

const initialForm = {
  email: '',
  message: '',
  name: '',
}

function ContactPage() {
  const [form, setForm] = useState(initialForm)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const subject = encodeURIComponent(`Project inquiry from ${form.name || 'a new client'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    )

    window.location.href = `mailto:kishanmalviy14@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <section className="contact-page">
        <Reveal className="contact-page__copy">
          <p className="eyebrow">Let&apos;s Connect!</p>
          <h1 className="display-title display-title--compact">Have a project in mind? Let&apos;s create something cinematic together.</h1>
          <p className="hero-copy">
            Reach out and let&apos;s turn your vision into a high-impact cinematic
            story.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="eyebrow">Fill this form out</p>
            <div className="contact-form__row">
              <label>
                <span>Name</span>
                <input name="name" onChange={handleChange} placeholder="Name" required value={form.name} />
              </label>
              <label>
                <span>E-mail</span>
                <input
                  name="email"
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                  type="email"
                  value={form.email}
                />
              </label>
            </div>
            <label>
              <span>Message</span>
              <textarea
                name="message"
                onChange={handleChange}
                placeholder="Message"
                required
                rows="8"
                value={form.message}
              />
            </label>
            <button className="contact-form__submit" type="submit">
              Send Email
            </button>
          </form>
        </Reveal>
      </section>

      <Reveal>
        <MediaFrame
          alt="Contact hero portrait"
          className="feature-band"
          src="https://framerusercontent.com/images/63qPdrWYzZYExNFomXdFNLeAk.png"
        />
      </Reveal>

      <section className="contact-info">
        <Reveal className="contact-info__group">
          <p className="eyebrow">FOLLOW ME</p>
          {socialLinks.map((link) => (
            <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </Reveal>
        <Reveal className="contact-info__group" delay={0.08}>
          <p className="eyebrow">CURRENT LOCATION</p>
          <strong>Ahmedabad, India</strong>
          <span>INDIA</span>
        </Reveal>
        <Reveal className="contact-info__group" delay={0.16}>
          <p className="eyebrow">PHONE</p>
          <strong>IN &nbsp; +91 91668 36248</strong>
        </Reveal>
        <Reveal className="contact-info__group" delay={0.24}>
          <p className="eyebrow">EMAIL ME</p>
          <a href="mailto: kishanmalviy14@gmail.com"> kishanmalviy14@gmail.com</a>
        
        </Reveal>
      </section>
    </>
  )
}

export default ContactPage
