import NotchedButton from '../components/NotchedButton.jsx'
import Reveal from '../components/Reveal.jsx'

function NotFoundPage() {
  return (
    <section className="not-found">
      <Reveal>
        <p className="eyebrow">404 / Signal Lost</p>
        <h1 className="display-title">Page not found</h1>
        <p className="hero-copy">
          The route exists outside the current grid. Let&apos;s get you back to the
          main experience.
        </p>
        <div className="not-found__actions">
          <NotchedButton to="/">Back Home</NotchedButton>
          <NotchedButton to="/work" variant="ghost">
            Explore Work
          </NotchedButton>
        </div>
      </Reveal>
    </section>
  )
}

export default NotFoundPage
