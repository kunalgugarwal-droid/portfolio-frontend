import Reveal from './Reveal.jsx'

function PageHero({ eyebrow, title, description, action }) {
  return (
    <section className="page-hero">
      <Reveal className="page-hero__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display-title">{title}</h1>
        {description ? <p className="hero-copy">{description}</p> : null}
        {action ? <div className="hero-action">{action}</div> : null}
      </Reveal>
    </section>
  )
}

export default PageHero
