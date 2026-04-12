import ContactCta from '../components/ContactCta.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import MediaFrame from '../components/MediaFrame.jsx'
import NotchedButton from '../components/NotchedButton.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import {
  aboutGallery,
  aboutStats,
  capabilities,
  experience,
  faqItems,
  hardware,
  stack,
} from '../data/siteData.js'

function AboutPage() {
  return (
    <>
      <PageHero
        action={<NotchedButton to="/contact">Learn Detailed*</NotchedButton>}
        description="Unleash your creativity. Showcase your work and highlight your unique skills to attract new clients."
        eyebrow="MORE ABOUT"
        title="DAVIDSON"
      />

      <Reveal>
        <MediaFrame
          alt="About hero"
          className="feature-band"
          src="https://framerusercontent.com/images/W12Iiq84nUEJ99ek5p4RDOSnaI.png"
        />
      </Reveal>

      <section className="stat-strip">
        {aboutStats.map((stat, index) => (
          <Reveal className="stat-strip__item" delay={index * 0.06} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </Reveal>
        ))}
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="About KD6"
          title="My approach and strategy live at the point where minimal form meets atmospheric storytelling."
        />
        <div className="mosaic-grid">
          {aboutGallery.map((image, index) => (
            <Reveal delay={index * 0.08} key={image}>
              <MediaFrame alt={`About gallery ${index + 1}`} className="mosaic-grid__item" src={image} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="EXPERIENCE" title="Years of direction, systems thinking, and interface craft." />
        <div className="experience-list">
          {experience.map((item, index) => (
            <Reveal className="experience-row" delay={index * 0.06} key={`${item.company}-${item.years}`}>
              <div>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <span>{item.years}</span>
              <p>{item.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="ALL MY STACK" title="Tools tuned for speed, polish, and cinematic presentation." />
        <div className="stack-grid">
          {stack.map((item, index) => (
            <Reveal className="stack-card" delay={index * 0.05} key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <strong>{item.score}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="manifesto manifesto--secondary">
        <Reveal>
          <p className="section-description">
            A designer crafts visual narratives that blend creativity with
            functionality, shaping impactful experiences through artful design.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="manifesto__title">
            Awe makes
            <br />
            things happen.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <MediaFrame
          alt="About portrait"
          className="feature-band"
          src="https://framerusercontent.com/images/4H8LspKstP78QCprZbYDYLpQiY.png"
        />
      </Reveal>

      <section className="section">
        <SectionTitle
          eyebrow="CAPABILITIES"
          title="Mastery in crafting user-centric design solutions."
        />
        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <Reveal className="capability-card" delay={index * 0.08} key={capability.title}>
              <MediaFrame alt={capability.title} className="capability-card__media" src={capability.image} />
              <div className="capability-card__copy">
                <h3>{capability.title}</h3>
                <strong>{capability.price}</strong>
                <p>{capability.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="hardwares" title="The gear behind the render pipeline." />
        <div className="hardware-grid">
          {hardware.map((item, index) => (
            <Reveal className="hardware-card" delay={index * 0.06} key={item.model}>
              <MediaFrame alt={item.model} className="hardware-card__media" src={item.image} />
              <p className="eyebrow">{item.label}</p>
              <h3>
                {item.brand}
                <span>{item.model}</span>
              </h3>
              <p>{item.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="manifesto manifesto--secondary">
        <Reveal>
          <p className="section-description">
            With a portfolio of successful brand transformations across various
            industries, I have earned a reputation for outstanding results.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="manifesto__title">
            Mind inspires
            <br />
            boundless imagination.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <MediaFrame
          alt="About detail portrait"
          className="feature-band"
          src="https://framerusercontent.com/images/kMKw4JDtFWrl5VvZZnMUQN6nZc.png"
        />
      </Reveal>

      <section className="section">
        <SectionTitle eyebrow="Frequently Asked Questions" title="A few things collaborators usually ask." />
        <FAQAccordion items={faqItems} />
      </section>

      <ContactCta />
    </>
  )
}

export default AboutPage
