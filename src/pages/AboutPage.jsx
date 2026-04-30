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
  faqItems,
  stack,
} from '../data/siteData.js'

function AboutPage() {
  return (
    <>
      <PageHero
        action={<NotchedButton to="/contact">Get In Touch*</NotchedButton>}
        description="I help creators and brands turn raw footage into cinematic, high-impact videos that capture attention and drive engagement."
        eyebrow="MORE ABOUT"
        title="KISHAN MALVIYA"
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
          eyebrow="About Me"
          title="My approach blends cinematic storytelling with precise editing to create videos that captivate and convert."
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
            A video editor crafts visual narratives that blend storytelling with
            technical precision, shaping cinematic experiences through artful editing.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="manifesto__title">
            Edits make
            <br />
            stories hit.
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
          title="Focused on delivering clean, cinematic edits with fast turnaround."
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



      <section className="manifesto manifesto--secondary">
        <Reveal>
          <p className="section-description">
            With a portfolio of cinematic edits and visual storytelling across various
            projects, I have earned a reputation for high-impact results.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="manifesto__title">
            Vision drives
            <br />
            cinematic impact.
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
