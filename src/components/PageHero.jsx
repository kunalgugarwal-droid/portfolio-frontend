import RevealOnScroll from './RevealOnScroll.jsx'

function PageHero({ eyebrow, title, description, action }) {
  return (
    <section className="page-hero">
      <RevealOnScroll className="page-hero__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display-title">{title}</h1>
        {description ? <p className="hero-copy">{description}</p> : null}
        {action ? <div className="hero-action">{action}</div> : null}
      </RevealOnScroll>
    </section>
  )
}

export default PageHero
