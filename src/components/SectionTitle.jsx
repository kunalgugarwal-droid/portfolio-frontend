import RevealOnScroll from './RevealOnScroll.jsx'

function SectionTitle({ eyebrow, title, description, action, align = 'space' }) {
  const classes = ['section-title', `section-title--${align}`].join(' ')

  return (
    <div className={classes}>
      <RevealOnScroll className="section-title__copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-heading">{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </RevealOnScroll>
      {action ? (
        <RevealOnScroll className="section-title__action" delay={0.1}>
          {action}
        </RevealOnScroll>
      ) : null}
    </div>
  )
}

export default SectionTitle
