import ContactCta from '../components/ContactCta.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import MediaFrame from '../components/MediaFrame.jsx'
import NotchedButton from '../components/NotchedButton.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import TextReveal from '../components/TextReveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import {
  awards,
  clientLogos,
  faqItems,
  getProjectsBySlugs,
  homeFeaturedSlugs,
  pricingPlans,
  services,
  siteIdentity,
  socialLinks,
  testimonials,
  workProcess,
} from '../data/siteData.js'

const featuredProjects = getProjectsBySlugs(homeFeaturedSlugs)

function HomePage() {
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
              text="GUETABERTO DAVIDSON"
              split="word"
              delay={0.1}
              staggerDuration={0.06}
            />
          </div>
          
          <Reveal className="hero-footer" delay={0.2}>
            <div className="hero-location">BASED IN LA, CALIFORNIA</div>
            <div className="hero-roles">///DIGITAL DESIGNER + FRAMER DEVELOPER</div>
          </Reveal>
        </section>

        <section className="hero-image-section">
          <Reveal id="image-1" delay={0.3}>
            <img
              alt="Hero portrait"
              className="hero-image-full"
              src="https://framerusercontent.com/images/Dqh3FA7ENXaHQxWUEi11hFrOF5Y.png"
            />
          </Reveal>
        </section>

        <div className="about-transition-wrapper">
          <div className="about-transition-container">
            <section className="split-copy" id="about">
              <div className="flex flex-col gap-2">
                <p className="eyebrow">ABOUT KD6</p>
                <TextReveal
                  elementType="h2"
                  className="display-title display-title--compact manifesto__title"
                  text="I am a future digital designer."
                  split="word"
                  staggerDuration={0.05}
                />
              </div>
              <Reveal className="split-copy__aside" delay={0.1}>
                <p className="eyebrow">Challenges &amp; Approach</p>
                <p className="section-description">
                  I weave together bold strategy and creative execution to produce
                  thought-provoking, digital-first experiences with a cinematic cyberpunk
                  edge.
                </p>
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      <section className="logo-marquee">
        <div className="logo-marquee__track">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div className="logo-marquee__item" key={`${logo.src}-${index}`}>
              <img alt={logo.name} src={logo.src} />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle
          action={<NotchedButton to="/work">View Portfolio*</NotchedButton>}
          description="My creative spirit comes alive in the digital realm. With nimble fingers flying across the keyboard, I craft clear experiences out of nothing but ones and zeroes."
          eyebrow="FEATURED CASES"
          title="Featured cases"
        />
        <div className="project-grid project-grid--featured">
          {featuredProjects.map((project, index) => (
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
          eyebrow="WELCOME TO THE WORK PROCESS"
          title="A sharp production loop built for futuristic brand systems."
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
          description="Providing bespoke design services focused on creative enhancing user engagement and brand identity."
          eyebrow="my services"
          title="Creative modules made for immersive web storytelling."
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
            I weave together bold strategy and creative execution to produce
            thought-provoking digital realistic experiences to the users.
          </p>
        </Reveal>
        <div className="relative pt-8">
          <TextReveal
            elementType="p"
            className="manifesto__title"
            text="I am evolutionarily wired to sleek wonder."
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
          <p className="eyebrow">VOICE OF DA-VID</p>
          <TextReveal
            elementType="h2"
            className="section-heading"
            text="For brands. For agencies."
            split="word"
            staggerDuration={0.05}
          />
          <p className="voice-grid__code pt-4">_D4V1D*M00R3_5H / r9H4DnOj6LVw2C</p>
          <div className="voice-grid__links">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
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
          description="These honors underscore my commitment to delivering outstanding creative solutions."
          eyebrow="AWARDS"
          title="Recognition earned through detail, pace, and digital craft."
        />
        <div className="award-list">
          {awards.map((award, index) => (
            <Reveal className="award-row" delay={index * 0.05} key={award.index}>
              <span>{award.index}</span>
              <span>{award.year}</span>
              <span>{award.org}</span>
              <strong>{award.title}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Trusted By International Brands"
          title="Proof points from teams that needed premium visuals and faster launches."
        />
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <Reveal className="testimonial-card" delay={index * 0.05} key={testimonial.author}>
              <p className="testimonial-card__label">{testimonial.label}</p>
              <p className="testimonial-card__quote">{testimonial.quote}</p>
              <div className="testimonial-card__author">
                <img alt={testimonial.author} src={testimonial.avatar} />
                <div>
                  <strong>{testimonial.author}</strong>
                  <p>{testimonial.role}</p>
                </div>
              </div>
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
          eyebrow="BIG OR SMALL?"
          title="I have a plan."
        />
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <Reveal className="pricing-card" delay={index * 0.08} key={plan.name}>
              <p className="eyebrow">{plan.eyebrow}</p>
              <h3>{plan.name}</h3>
              <p className="pricing-card__price">{plan.price}</p>
              <p className="pricing-card__kicker">{plan.kicker}</p>
              <p>{plan.summary}</p>
              <p className="pricing-card__description">{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <NotchedButton to="/contact" variant={index === 0 ? 'ghost' : 'light'}>
                {plan.cta}
              </NotchedButton>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <SectionTitle eyebrow="Frequently Asked Questions" title="Need a clearer signal before launch?" />
        <FAQAccordion items={faqItems} />
      </section>

      <ContactCta />
    </>
  )
}

export default HomePage
